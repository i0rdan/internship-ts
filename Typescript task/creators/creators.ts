import * as Products from "../products/products";
import { Typography } from "../typography/typography";

export class CreatorOfBook extends Typography{
    createProduct(name: string, author: string, typeOfProduct: Products.Product.TypeOfProducts['book']): Products.Product.Book {
        return new Products.Product.Book(name, author, typeOfProduct);
    }
}

export class CreatorOfPostcard extends Typography{
    createProduct(name: string, author: string, typeOfProduct: Products.Product.TypeOfProducts['postcard']): Products.Product.Postcard {
        return new Products.Product.Postcard(name, author, typeOfProduct);
    }
}

export class CreatorOfBuisnessCard extends Typography{
    createProduct(name: string, author: string, typeOfProduct: Products.Product.TypeOfProducts['buisness card']): Products.Product.BuisnessCard {
        return new Products.Product.BuisnessCard(name, author, typeOfProduct);
    }
}