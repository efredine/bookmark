const DB_NAME = 'bookmarks';
const VERSION = '1.0';
const DESCRIPTION = 'Offline book marked pages';
const DEFAULT_SIZE = 5 * 1024 * 1024;

const CREATE_TABLES = `
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL
  );
`;

const createTables = error => tx => {
  tx.executeSql(
    CREATE_TABLES,
    [],
    (_, result) => {
      console.log('Tables created.', result);
    },
    error
  );
};

// open webSQL db and create necessary tables
const prepareDatabase = error =>
  openDatabase(DB_NAME, VERSION, DESCRIPTION, DEFAULT_SIZE, db => {
    db.version === ''
      ? db.transaction(createTables(error))
      : db.changeVersion(db.version, VERSION, createTables(error), error);
  });

const executeSql = (sql, parameters, resolve, reject) => tx =>
  tx.executeSql(sql, parameters, resolve, reject);

const query = (db, sql, parameters = []) =>
  new Promise((resolve, reject) => {
    db.readTransaction(executeSql(sql, parameters, resolve, reject), reject);
  });

const mutation = (db, sql, parameters = []) =>
  new Promise((resolve, reject) => {
    db.transaction(executeSql(sql, parameters, resolve, reject), reject);
  });

export { prepareDatabase, query, mutation };
