import StorageDao from "../data/StorageDao.js";

class StorageAreaService {
  constructor() {
    this.storageDao = new StorageDao();
  }

  async createStorageArea(userId, storageName) {
    console.log(`creating new storage area ${storageName}...`)
    let storageAreaId = null;
    let userStorageAreaId = null;
    let storageArea = null;

    // Insert storage_area with valid name
    if (storageName) {
      storageAreaId = await this.storageDao.insertStorageArea(storageName);
    }

    // insert user_storage_area with valid storage_id
    if (storageAreaId) {
      const userStorageArea = { userId: userId, storageId: storageAreaId };
      userStorageAreaId = await this.storageDao.insertUserStorageArea(
        userStorageArea
      );
    }
    // select storage_area record if successfully inserted to both tables
    if (userStorageAreaId) {
      storageArea = await this.storageDao.getStorageArea(storageAreaId);
    }

    return storageArea;
  }

  async editStorageArea(storageArea) {}

  async deleteStorageArea(id) {}
}

export default StorageAreaService;
