import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs";
// @ts-ignore
import { AccessHandlePoolVFS } from "wa-sqlite/src/examples/AccessHandlePoolVFS.js";
import * as SQLite from "wa-sqlite";

/**
 * A generic key-value store built on IndexedDB.
 *
 * @template K The type of the keys in the store. Must be an IndexedDB valid key type.
 * @template V The type of the values in the store. Can be any valid JavaScript type supported by IndexedDB.
 */
class IndexedDBStore<K extends IDBValidKey, V> {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null = null;
  private dbOpenPromise: Promise<IDBDatabase> | null = null;

  /**
   * Creates an instance of IndexedDBStore.
   * @param dbName The name of the IndexedDB database.
   * @param storeName The name of the object store within the database.
   */
  constructor(dbName = "myAppDB", storeName = "keyValStore") {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  /**
   * Internal method to get or open the IndexedDB database connection.
   * Ensures the database is only opened once and handles upgrades.
   * @returns A promise that resolves with the IDBDatabase instance.
   */
  private async _getDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.dbOpenPromise) {
      return this.dbOpenPromise;
    }

    this.dbOpenPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
        this.dbOpenPromise = null; // Clear the promise once resolved
      };

      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(
          `IndexedDB error: ${error?.name} - ${error?.message}`,
          event,
        );
        reject(
          new Error(
            `Failed to open IndexedDB: ${error?.message || "Unknown error"}`,
          ),
        );
        this.dbOpenPromise = null; // Clear the promise on error
      };
    });

    return this.dbOpenPromise;
  }

  /**
   * Sets (puts or updates) a value in the store.
   * @param key The key to associate with the value.
   * @param value The value to store.
   * @returns A promise that resolves when the value has been successfully stored.
   */
  public async set(key: K, value: V): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      // Specify 'readwrite' mode for writing operations
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      // put() method will add or update the value based on the key
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Set error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to set value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Retrieves a value from the store by its key.
   * @param key The key of the value to retrieve.
   * @returns A promise that resolves with the retrieved value, or `undefined` if the key does not exist.
   */
  public async get(key: K): Promise<V | undefined> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      // Specify 'readonly' mode for reading operations
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);

      request.onsuccess = (event: Event) => {
        // Cast the result to the expected value type V
        resolve((event.target as IDBRequest).result as V | undefined);
      };
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Get error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to get value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Deletes a value from the store by its key.
   * @param key The key of the value to delete.
   * @returns A promise that resolves when the value has been successfully deleted.
   */
  public async delete(key: K): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(
          `Delete error: ${error?.name} - ${error?.message}`,
          event,
        );
        reject(
          new Error(
            `Failed to delete value: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }

  /**
   * Clears all key-value pairs from the object store.
   * @returns A promise that resolves when the store has been successfully cleared.
   */
  public async clear(): Promise<void> {
    const db = await this._getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest).error;
        console.error(`Clear error: ${error?.name} - ${error?.message}`, event);
        reject(
          new Error(
            `Failed to clear store: ${error?.message || "Unknown error"}`,
          ),
        );
      };
    });
  }
}

const kvStore = new IndexedDBStore<string, string>();

let sqlite3: ReturnType<typeof SQLite.Factory>;
let db: number;
let vfs: any;

let dbReadyResolvers: Array<() => void> = [];
let isDbReady = false;

async function clearDirectoryRecursive(
  directoryHandle: FileSystemDirectoryHandle,
) {
  for await (const entry of directoryHandle.values()) {
    if (entry.kind === "file") {
      await directoryHandle.removeEntry(entry.name);
    } else if (entry.kind === "directory") {
      await clearDirectoryRecursive(entry);
      await directoryHandle.removeEntry(entry.name);
    }
  }
}

export async function clearAllOPFSStorage() {
  try {
    if (db) await sqlite3.close(db);
    if (vfs) await vfs.close();
    db = 0;
    vfs = null;
    isDbReady = false;
    const rootDirHandle = await navigator.storage.getDirectory();
    await clearDirectoryRecursive(rootDirHandle);
    console.log("cleared!");
  } catch (error) {
    console.error("Error clearing OPFS storage:", error);
    throw error;
  }
}

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

  // force clear opfs on breaking updates
  const updateId = "one";
  if ((await kvStore.get("clear")) !== updateId) {
    console.log("clearing opfs...");
    await clearAllOPFSStorage();
    await kvStore.set("clear", updateId);
    console.log("clearing opfs... done.");
  }

  const module = await SQLiteESMFactory();
  sqlite3 = SQLite.Factory(module);
  vfs = await AccessHandlePoolVFS.create("ahp", module);
  sqlite3.vfs_register(vfs, true);
  db = await sqlite3.open_v2("mydb");

  await sqlite3.exec(
    db,
    [
      "PRAGMA locking_mode = exclusive;",
      "PRAGMA journal_mode = wal;",
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

  let checkFTS = false;
  await sqlite3.exec(
    db,
    "SELECT name FROM sqlite_master WHERE type='table' AND name='threads_fts';",
    (row) => {
      if (row[0] === "threads_fts") checkFTS = true;
    },
  );

  await sqlite3.exec(
    db,
    `
    CREATE VIRTUAL TABLE IF NOT EXISTS threads_fts USING fts5(
      title,
      messages_content,
      thread_id,
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

  if (!checkFTS) {
    console.log("rebuilding fts index...");
    await sqlite3.exec(db, "DELETE FROM threads_fts;");
    await sqlite3.exec(
      db,
      `
      INSERT INTO threads_fts (thread_id, title, messages_content)
      SELECT
        t.id,
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
  }

  isDbReady = true;
  console.log("db ready!");
  dbReadyResolvers.forEach((resolve) => resolve());
  dbReadyResolvers = [];
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
