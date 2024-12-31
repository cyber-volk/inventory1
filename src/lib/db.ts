import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs';

const dbFile = 'database.sqlite';

if (!fs.existsSync(dbFile)) {
  fs.closeSync(fs.openSync(dbFile, 'w'));
}

const dbPromise = open({
  filename: dbFile,
  driver: sqlite3.Database
}).then(db => {
  // Create tables if they don't exist
  return db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact TEXT,
      email TEXT,
      phone TEXT,
      address TEXT
    );
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      customerName TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      itemName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      fromLocation TEXT,
      toLocation TEXT,
      reference TEXT,
      status TEXT NOT NULL,
      handledBy TEXT
    );
  `).then(() => db); // Return the db instance after executing the commands
});

export const getDb = async () => {
  return dbPromise;
};

export const getStockMovementsSchema = async () => {
  const db = await getDb();
  const schema = await db.all("PRAGMA table_info(stock_movements);");
  console.log(schema);
  return schema;
};
