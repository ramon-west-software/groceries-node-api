import ItemDao from "../data/ItemDao.js";

class ItemService {
  constructor() {
    this.itemDao = new ItemDao();
  }

  async createItem(itemDetails) {
    console.log(`creating new grocery item: ${itemDetails.name}...`);
    let itemId = null;
    let categoryItemId = null;
    let item = null;

    if (itemDetails) {
      itemId = await this.itemDao.insertItem(itemDetails);
    }

    if (itemId) {
      const categoryItem = {
        categoryId: itemDetails.categoryId,
        itemId: itemId,
      };
      categoryItemId = await this.itemDao.insertCategoryItem(categoryItem);
    }

    if (categoryItemId) {
      item = await this.itemDao.getItem(itemId);
    }

    return item;
  }
}

export default ItemService;
