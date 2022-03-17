import Provider from "./provider";

export default class ArtisanServiceProvider {

  private providers = new Map();

  public add<T>(id: string, provider: any): void {
    this.providers.set(id, new provider());
  }

  public get<T>(id: string): T {
    if (this.providers.has(id)) {
      return this.providers.get(id) as T
    }
    return new Provider() as unknown as T;
  }

  public getProviders() {
    return this.providers;
  }

}