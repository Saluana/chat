// db-helper.ts

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

export const kvStore = new IndexedDBStore<string, string>();
