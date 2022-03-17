import { app } from "src";
import { ArtisanServiceProvider } from "..";

export function provider(): ArtisanServiceProvider {
  return app().getInstance('provider');
}

export function setProvider<T>(id: string, instance: any): void {
  provider().add<T>(id, instance)
}

export function getProvider<T>(id: string): T {
  return provider().get<T>(id);
}