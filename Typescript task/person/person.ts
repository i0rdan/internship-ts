import * as Products from "../products/products";

export interface Person {
    nickname: string;
    surname: string;
    shielf: Products.Product.Product[];
}

export class Client implements Person{
    constructor(readonly nickname: string, readonly surname: string, public shielf: Products.Product.Product[]) {
    }

    addToShielf (book: Products.Product.Product) {
        this.shielf.push(book);
    }
}