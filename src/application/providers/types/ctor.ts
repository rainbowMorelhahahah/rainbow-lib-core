/**
 * 定义是否类
 */
export interface Ctor<T> {
    new(...args: any[]): T
    name: string
}

/**
 * 是否一个类
 * @param thing 
 * @returns 
 */
export function isCtor<T>(thing: unknown): thing is Ctor<T> {
    return typeof thing === "function";
}