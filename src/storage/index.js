const DB_NAME = 'bookmarks';
const VERSION = '1.0';
const DESCRIPTION = 'Offline book marked pages';
const DEFAULT_SIZE = 5 * 1024 * 1024;

const CREATE_TABLES = `
  CREATE VIRTUAL TABLE fs_pages 
  USING FTS3(title, url, content);
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

// Exporting executeSql separately as query and mutation in case we someday need to handle
// them differently. The db.readTransaction option didn't seem to work. 
const executeSql = (db, sql, parameters = []) =>
  new Promise((resolve, reject) => {
    db.transaction(
      tx =>
        tx.executeSql(
          sql,
          parameters,
          (_, results) => resolve(results),
          reject
        ),
      reject
    );
  });

export { prepareDatabase, executeSql as query, executeSql as mutation };
