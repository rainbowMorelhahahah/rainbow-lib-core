import { Ctor } from "./types/ctor"
import { DependencyIdentifier } from "./types/dependency-identifier"


export const IdentifierDecoratorSymbol = Symbol('$$IDENTIFIER_DECORATOR')

export type IdentifierDecorator<T> = {
    [IdentifierDecoratorSymbol]: true

    /**
     * decorator
     */
    (target: Ctor<T>, key: string, index: number): void

    /**
     * beautify console
     */
    toString(): string
}

const knownIdentifiers = new Set<string>()

export function createIdentifier<T>(id: string): IdentifierDecorator<T> {
    knownIdentifiers.add(id)
    
    const decorator = function (registerTarget: Ctor<T>, _key: string, index: number): void {
        
    } as IdentifierDecorator<T> // decorator as an identifier

    decorator.toString = () => id
    decorator[IdentifierDecoratorSymbol] = true

    return decorator
}