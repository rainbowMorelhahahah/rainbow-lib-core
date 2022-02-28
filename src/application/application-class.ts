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

    public getVersion() {
        return this.version;
    }

    public setInstance<T>(abstract: string, instance: T) {
        this.instance.set(abstract, instance);
    }

    public getInstance(abstract: string) {
        return this.instance.get(abstract);
    }

}