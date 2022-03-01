import { CookieFactory, LocalStorageFactory } from "src";

export default class Application {

    private static instance: Application;

    private readonly version: string = "v1.0.0";

    private instance: Map<string, any> = new Map();

    public static getInstance(): Application {
        if (!this.instance) {
            this.instance = new Application()
        }
        return this.instance;
    }

    public constructor() {
        /**
         * 注册基本的功能模块
         */
        this.registerBaseBindings();
    }

    public getVersion() {
        return this.version;
    }

    public setInstance<T>(abstract: string, instance: T) {
        this.instance.set(abstract, instance);
    }

    public getInstance(abstract: string) {
        return this.instance.get(abstract);
    }

    public registerBaseBindings() {
        this.setInstance('cookie', CookieFactory.getInstance());
        this.setInstance('localStoreage', LocalStorageFactory.getInstance());
    }
    
}