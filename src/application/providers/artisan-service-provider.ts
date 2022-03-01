import { Ctor, isCtor } from "./types/ctor";
import { DependencyIdentifier } from "./types/dependency-identifier";

export default class ArtisanServiceProvider {

    private providerMap: Map<any, any> = new Map();

    public add<T>(ctor: Ctor<T>): void
    public add<T>(identifier: DependencyIdentifier<T>): void
    public add<T>(id: Ctor<T> | DependencyIdentifier<T>): void {
        if (isCtor(id)) {
            let instance = id as Ctor<T>;
            this.providerMap.set(id.name, new instance())
        }
    }

    public get<T>(id: DependencyIdentifier<T>): T {
        let instance = id as Ctor<T>;
        return this.providerMap.get(instance.name)
    }
}