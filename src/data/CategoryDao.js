import getDatabaseInstance from "./DataBaseSinglton.js";

const databaseInstance = getDatabaseInstance();

class CategoryDao {
  async insertCategory(categoryName) {
    console.log("inserting category...");
    const sql = `INSERT INTO categories (category_name) VALUES (?)`;

    const result = await databaseInstance.query(
      sql,
      [categoryName],
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

  async insertStorageAreaCategory(storageAreaCategory) {
    console.log("inserting storage_area_category...");
    const storageId = storageAreaCategory.storageId;
    const categoryId = storageAreaCategory.categoryId;
    const sql = `INSERT INTO storage_area_categories (storage_id, category_id) VALUES (?,?)`;

    const result = await databaseInstance.query(
      sql,
      [storageId, categoryId],
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

  async getCategory(id) {
    console.log("querying category...");
    // define query string
    // note - MySql lets us return a JSON object using JSON_OBJECT function, meaning we don't need a helper function to format the result set
    const sqlQuery = `
          SELECT 
            JSON_OBJECT(
                'id', c.category_id,
                'name', c.category_name
            ) as category
            FROM categories c
            where c.category_id = ?;`;

    // call the Database.js function to query sql with paramater array
    let category = await databaseInstance.query(sqlQuery, [id]);
    return category;
  }
}

export default CategoryDao;
