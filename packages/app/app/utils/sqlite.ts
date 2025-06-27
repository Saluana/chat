import * as SQLite from "wa-sqlite";
export async function execWithParams(
  sqlite3: any,
  db: number,
  sql: string,
  params?: any,
) {
  let columns: any[] = [];
  const rows: any[] = [];
  for await (const stmt of sqlite3.statements(db, sql)) {
    if (params) {
      sqlite3.bind_collection(stmt, params);
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
  };
}
