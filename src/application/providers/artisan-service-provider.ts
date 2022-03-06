import { Ctor, isCtor } from "./types/ctor";
import { DependencyIdentifier } from "./types/dependency-identifier";
import { Container } from 'inversify';

export default class ArtisanServiceProvider {

    private providers: Container = new Container();

    public add<T>(id: string, provider: any): void {
        this.providers.bind<T>(id).to(provider);
    }

}