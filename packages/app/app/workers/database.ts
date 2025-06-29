import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs";
// @ts-ignore
import { AccessHandlePoolVFS } from "wa-sqlite/src/examples/AccessHandlePoolVFS.js";
import * as SQLite from "wa-sqlite";

let sqlite3: ReturnType<typeof SQLite.Factory>;
let db: number;

let dbReadyResolvers: Array<() => void> = [];
let isDbReady = false;

export const waitForDatabase = async () => {
  if (isDbReady) {
    return Promise.resolve();
  }
  initDatabase();
  return new Promise((resolve) => {
    dbReadyResolvers.push(resolve as any);
  });
};

let isStarting = false;
export const initDatabase = async () => {
  if (isStarting) return;
  isStarting = true;
  const module = await SQLiteESMFactory();
  sqlite3 = SQLite.Factory(module);
  const vfs = await AccessHandlePoolVFS.create("hello", module);
  sqlite3.vfs_register(vfs, true);
  db = await sqlite3.open_v2("one");

  await sqlite3.exec(
    db,
    [
      "PRAGMA locking_mode=exclusive;",
      "PRAGMA journal_mode=wal;",
      "PRAGMA synchronous = NORMAL;",
    ].join(""),
  );

  // Initialize threads table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS threads (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        last_message_at INTEGER NOT NULL,
        parent_thread_id TEXT,
        status TEXT NOT NULL DEFAULT 'ready',
        deleted INTEGER DEFAULT 0,
        pinned INTEGER DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize messages table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        data TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        error TEXT,
        deleted INTEGER DEFAULT 0,
        thread_id TEXT NOT NULL,
        stream_id TEXT,
        message_index INTEGER NOT NULL DEFAULT 0,
        clock INTEGER
      )
    `,
  );

  // Initialize kv table
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS kv (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        value TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        clock INTEGER
      )
    `,
  );

  // Initialize clock
  await sqlite3.exec(
    db,
    `
      CREATE TABLE IF NOT EXISTS clock (
        id INTEGER PRIMARY KEY,
        clock INTEGER
      );
    `,
  );
  await sqlite3.exec(
    db,
    `INSERT OR IGNORE INTO clock (id, clock) VALUES (1, 0);`,
  );

  await sqlite3.exec(
    db,
    `
    CREATE VIRTUAL TABLE IF NOT EXISTS threads_fts USING fts5(
      title,
      messages_content,
      thread_id UNINDEXED,
    );
  `,
  );

  // Triggers to keep threads_fts in sync with the threads table
  await sqlite3.exec(
    db,
    `
    -- When a new thread is created, insert a corresponding row into the FTS table.
    -- The messages_content is initially empty.
    CREATE TRIGGER IF NOT EXISTS threads_after_insert
    AFTER INSERT ON threads
    BEGIN
      INSERT INTO threads_fts(thread_id, title, messages_content)
      VALUES (new.id, new.title, '');
    END;

    -- When a thread is deleted, delete its FTS entry.
    CREATE TRIGGER IF NOT EXISTS threads_after_delete
    AFTER DELETE ON threads
    BEGIN
      DELETE FROM threads_fts WHERE thread_id = old.id;
    END;

    -- When a thread's title is updated, update the FTS entry.
    CREATE TRIGGER IF NOT EXISTS threads_after_update
    AFTER UPDATE OF title ON threads
    BEGIN
      UPDATE threads_fts SET title = new.title WHERE thread_id = new.id;
    END;
  `,
  );

  // Triggers to keep threads_fts in sync with the messages table
  await sqlite3.exec(
    db,
    `
    -- A helper function to rebuild the messages_content for a given thread.
    -- This is the most robust way to handle message INSERT, UPDATE, and DELETE.
    CREATE TRIGGER IF NOT EXISTS messages_after_insert
    AFTER INSERT ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = new.thread_id
      )
      WHERE thread_id = new.thread_id;
    END;

    -- When a message is updated, rebuild the content for the entire thread.
    CREATE TRIGGER IF NOT EXISTS messages_after_update
    AFTER UPDATE OF content ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = new.thread_id
      )
      WHERE thread_id = new.thread_id;
    END;

    -- When a message is deleted, rebuild the content for the entire thread.
    CREATE TRIGGER IF NOT EXISTS messages_after_delete
    AFTER DELETE ON messages
    BEGIN
      UPDATE threads_fts
      SET messages_content = (
        SELECT GROUP_CONCAT(content, ' ')
        FROM messages
        WHERE thread_id = old.thread_id
      )
      WHERE thread_id = old.thread_id;
    END;
  `,
  );

  console.log("rebuilding fts index...");
  await sqlite3.exec(db, "DELETE FROM threads_fts;");
  await sqlite3.exec(
    db,
    `
      INSERT INTO threads_fts (title, messages_content)
      SELECT
        t.title,
        COALESCE(GROUP_CONCAT(m.content, ' '), '')
      FROM
        threads AS t
      LEFT JOIN
        messages AS m ON t.id = m.thread_id
      GROUP BY
        t.id;
    `,
  );
  console.log("rebuilding fts index... done.");

  isDbReady = true;
  console.log("db ready!");
  dbReadyResolvers.forEach((resolve) => resolve());
  dbReadyResolvers = [];
  console.log(
    await dbExec({
      sql: "SELECT title, messages_content FROM threads_fts WHERE threads_fts = 'hell*';",
      bindings: undefined,
    }),
  );
};

export const dbExec = async ({
  sql,
  bindings,
}: {
  sql: string;
  bindings: any;
}) => {
  await waitForDatabase();
  let columns: any[] = [];
  const rows: any[] = [];
  for await (const stmt of sqlite3.statements(db, sql)) {
    if (bindings) {
      sqlite3.bind_collection(stmt, bindings);
    }
    while ((await sqlite3.step(stmt)) === SQLite.SQLITE_ROW) {
      columns = columns.length === 0 ? sqlite3.column_names(stmt) : columns;
      const row = sqlite3.row(stmt);
      rows.push(row);
    }
  }
  return {
    rows: rows,
    columns: columns,
    changes: sqlite3.changes(db),
  };
};
