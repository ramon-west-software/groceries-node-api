import getDatabaseInstance from "./DataBaseSinglton.js";

const databaseInstance = getDatabaseInstance();

class StorageDao {
  // set sql query and call Database.js query function
  async getStorageArea(id) {
    console.log("querying storage_area...");
    // define query string
    // note - MySql lets us return a JSON object using JSON_OBJECT function, meaning we don't need a helper function to format the result set
    const sqlQuery = `
      SELECT 
        JSON_OBJECT(
            'id', sa.storage_id,
            'name', sa.storage_name
        ) as storageArea
        FROM storage_areas sa
        where sa.storage_id = ?;`;

    // call the Database.js function to query sql with paramater array
    let storageArea = await databaseInstance.query(sqlQuery, [id]);
    return storageArea;
  }

  async insertStorageArea(name) {
    console.log("inserting storage_area...");
    const sql = `INSERT INTO storage_areas (storage_name) VALUES (?)`;

    const result = await databaseInstance.query(sql, [name], (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
      } else {
        const newId = result.insertId;
        console.log("Record inserted successfully with ID:", newId);
      }
    });
    return result.insertId;
  }

  async insertUserStorageArea(userStorageArea) {
    console.log("inserting user_storage_area...");
    const userId = userStorageArea.userId;
    const storageId = userStorageArea.storageId;
    const sql = `INSERT INTO user_storage_areas (user_id, storage_id) VALUES (?,?)`;

    const result = await databaseInstance.query(
      sql,
      [userId, storageId],
      (err, result) => {
        if (err) {
          console.error("Error inserting record:", err);
        } else {
          const newId = result.insertId;
          console.log("Record inserted successfully with ID:", newId);
        }
      }
    );

    return result.insertId;
  }
}

export default StorageDao;
