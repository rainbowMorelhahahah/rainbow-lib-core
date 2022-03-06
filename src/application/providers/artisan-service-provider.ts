export default class ArtisanServiceProvider {

    private providers = new Map();

    public add<T>(id: string, provider: any): void {
        this.providers.set(id, provider);
    }

    public get<T>(id: string): T {
        return this.providers.get(id) as T
    }

    public getProviders() {
        return this.providers;
    }

}