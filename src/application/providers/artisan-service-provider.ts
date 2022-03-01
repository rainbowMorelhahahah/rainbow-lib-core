import { Ctor, isCtor } from "./types/ctor";
import { DependencyIdentifier } from "./types/dependency-identifier";

export default class ArtisanServiceProvider {

    private providerMap: Map<any, any> = new Map();

    public add<T>(ctor: Ctor<T>): void
    public add<T>(identifier: DependencyIdentifier<T>): void
    public add<T>(ctor: DependencyIdentifier<T>, instance: Ctor<T>): void
    public add<T>(id: string | Ctor<T> | DependencyIdentifier<T>, instance?: Ctor<T>): void {
        if (isCtor(id)) {
            let target = id as Ctor<T>;
            this.providerMap.set(id.name, new target())
        }

        if (typeof id === 'string' && instance !== undefined) {
            this.providerMap.set(id, new instance())
        }
    }

    public get<T>(id: DependencyIdentifier<T>): T {
        let key = "";
        if (isCtor(id)) {
            const instance = id as Ctor<T>;
            key = instance.name;
        }

        if (typeof id === 'string') {
            key = id;
        }
        
        return this.providerMap.get(key)
    }
}