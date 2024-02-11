import CategoryDao from "../data/CategoryDao.js";

class CategoryService {
  constructor() {
    this.categoryDao = new CategoryDao();
  }

  async createCategory(categoryDetails) {
    console.log(`creating new category ${categoryDetails.name}...`);
    let categoryId = null;
    let storageAreaCategoryId = null;
    let category = null;

    // Insert category with valid name
    if (categoryDetails.name) {
      categoryId = await this.categoryDao.insertCategory(categoryDetails.name);
    }

    // insert storage_area_category with valid category_id
    if (categoryId) {
      const storageAreaCategory = {
        storageId: categoryDetails.storageId,
        categoryId: categoryId,
      };
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
