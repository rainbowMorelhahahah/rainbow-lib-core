export interface ICache<T> {
    /**
        * get cache
        * @param key key
        */
    getValue(key: string): T

    /**
     * set cache
     * @param key 
     * @param value set value defualt type any
     */
    setValue(key: string, value: string | object): boolean


    /**
     * 删除cache
     * @param key 
     */
    remove(key: string): void
}