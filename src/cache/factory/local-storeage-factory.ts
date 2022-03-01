import LocalStorageImpl from "../impl/local-storeage-impl";

export default class LocalStorageFactory {
    public static getInstance() {
        return new LocalStorageImpl()
    }
}