import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ content: content });
  const result = await request;
  console.log("Content saved to database", result);

  // console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const results = await request;
  console.log("result.value", result);
  return results;
};

// console.error('getDb not implemented');

initdb();