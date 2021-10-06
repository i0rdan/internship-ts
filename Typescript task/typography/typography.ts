import * as Products from "../products/products";
import { CreatorOfBook } from "../creators/creators";
import { CreatorOfPostcard } from "../creators/creators";
import { CreatorOfBuisnessCard } from "../creators/creators";


export class Typography {
    readonly timeForCreateBook: number = 3000;
    readonly timeForCreatePostCard: number = 4000;
    readonly timeForCreateBuisnessCard: number = 5000;

    constructor(private label: string, private director: string, public store: Products.Product.Product[]) {
        if(!label || !director || store.length) {
            throw new TypeError ('Properties should be correct!');
        }
    }

    createProduct(name: string, author: string, typeOfProduct: keyof Products.Product.TypeOfProducts): void {
        if(typeOfProduct === 'book') {
            let newBook = new CreatorOfBook(this.label, this.director, this.store)
            .createProduct(name, author, 'book');
            setTimeout(() => {
                this.store.push(newBook);
            }, this.timeForCreateBook);
        }
        else if(typeOfProduct === 'postcard') {
            let newPostcard = new CreatorOfPostcard(this.label, this.director, this.store)
            .createProduct(name, author, 'postcard');
            setTimeout(() => {
                this.store.push(newPostcard);
            }, this.timeForCreatePostCard);
        }
        else {
            let newBuisnessCard = new CreatorOfBuisnessCard(this.label, this.director, this.store)
            .createProduct(name, author, 'buisness card');
            setTimeout(() => {
                this.store.push(newBuisnessCard);
            }, this.timeForCreateBuisnessCard);
        }
    }
    
}