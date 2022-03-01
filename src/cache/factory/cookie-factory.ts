import CookieImpl from "../impl/cookie-impl";

export default class CookieFactory {
    public static getInstance() {
        return new CookieImpl()
    }
}