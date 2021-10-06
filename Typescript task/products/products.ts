export namespace Product {
    export interface Product {
        name: string;
        author: string;
        typeOfProduct: keyof TypeOfProducts;
    }
    
    export interface TypeOfProducts {
        postcard: 'postcard';
        book: 'book';
        ['buisness card']: 'buisness card';
    }

    export class Postcard implements Product {
        constructor(readonly name: string, readonly author: string, readonly typeOfProduct: TypeOfProducts['postcard']) {
        }
    }
    
    export class Book implements Product {
        constructor(readonly name: string, readonly author: string, readonly typeOfProduct: TypeOfProducts['book']) {
        }
    }
    
    export class BuisnessCard implements Product {
        constructor(readonly name: string, readonly author: string, readonly typeOfProduct: TypeOfProducts['buisness card']) {
        }
    }
}