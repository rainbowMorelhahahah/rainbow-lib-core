import { app } from "src";
import { ArtisanServiceProvider } from "..";

export function provider(): ArtisanServiceProvider {
    return app().getInstance('provider');
}