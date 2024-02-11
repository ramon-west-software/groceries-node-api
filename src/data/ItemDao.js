import getDatabaseInstance from "./DataBaseSinglton.js";

const databaseInstance = getDatabaseInstance();

class ItemDao {
  async insertItem(item) {
    console.log("inserting grocery_item...");
    const sql = `INSERT INTO grocery_items (name, purchase_date, item_duration) VALUES (?, ?, ?)`;

    const result = await databaseInstance.query(
      sql,
      [item.name, item.purchaseDate, item.itemDuration],
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

  async insertCategoryItem(categoryItem) {
    console.log("inserting category_grocery_item...");
    const categoryId = categoryItem.categoryId;
    const itemId = categoryItem.itemId;
    const sql = `INSERT INTO category_grocery_items (category_id, grocery_item_id) VALUES (?,?)`;

    const result = await databaseInstance.query(
      sql,
      [categoryId, itemId],
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

  // set sql query and call Database.js query function
  async getItem(id) {
    console.log("querying grocery_item...");
    // define query string
    // note - MySql lets us return a JSON object using JSON_OBJECT function, meaning we don't need a helper function to format the result set
    const sqlQuery = `
      SELECT 
        JSON_OBJECT(
            'id', gi.grocery_item_id,
            'name', gi.name,
            'purchaseDate', gi.purchase_date,
            'itemDuration', gi.item_duration
        ) as item
        FROM grocery_items gi
        where gi.grocery_item_id = ?;`;

    // call the Database.js function to query sql with paramater array
    let item = await databaseInstance.query(sqlQuery, [id]);
    return item;
  }
}

export default ItemDao;
