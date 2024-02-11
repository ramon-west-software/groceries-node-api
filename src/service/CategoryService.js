import CategoryDao from "../data/CategoryDao.js";

class CategoryService {
    constructor() {
        this.categoryDao = new CategoryDao();
    }

    async createCategory(storageAreaId, categoryName) {
      console.log(`creating new category ${categoryName}...`);
      let categoryId = null;
      let storageAreaCategoryId = null;
      let category = null;
  
      // Insert category with valid name
      if (categoryName) {
        categoryId = await this.categoryDao.insertCategory(categoryName);
      }
  
      // insert storage_area_category with valid category_id
      if (categoryId) {
        const storageAreaCategory = { storageId: storageAreaId, categoryId: categoryId };
        storageAreaCategoryId = await this.categoryDao.insertStorageAreaCategory(
          storageAreaCategory
        );
      }
      // select category record if successfully inserted to both tables
      if (storageAreaCategoryId) {
        category = await this.categoryDao.getCategory(categoryId);
      }
  
      return category;
    }
}

export default CategoryService;