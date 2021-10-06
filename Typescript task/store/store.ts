import * as Products from "../products/products";
import { Typography } from "../typography/typography";
import { Person } from "../person/person";

export class Store {
    typography: Typography = new Typography('Mamms', 'Yauheni', []);
    storage: Products.Product.Product[] = [{name: 'shesd', author: 'she', typeOfProduct: 'book'}];
    subscribers: (Person & Products.Product.Product)[] = [];

    createProduct(name: string, author: string, typeOfProduct: keyof Products.Product.TypeOfProducts, person: Person) {
        console.log(`Dear ${person.nickname}, we sended request for your ${typeOfProduct}, ${name}`);
        this.typography.createProduct(name, author, typeOfProduct);
    }

    getFromTypography() {
        setTimeout(() => {
            if(this.typography.store.length) {
                this.storage = this.typography.store;
                this.typography.store = [];
                console.log('New products from typography added to store.');
                this.workWithSubs();
            }
            else {
                console.log('No items to add');
            }
        },6000)
    }

    subscribe(subscriber: Person & Products.Product.Product) {
        this.subscribers.push(subscriber);
    }

    unsubscribeAll() {
        this.subscribers = [];
    }

    broadcast <T> (subscriber: Person & Products.Product.Product) {
        return `${subscriber['nickname']}, your ${subscriber.typeOfProduct} added to our store.`;
    }

    addProductToUser(person: Person, product: Products.Product.Product) {
        let flagHave = false;
        this.storage.forEach((elem) => {
            if(elem.author === product.author && elem.name === product.name && elem.typeOfProduct === product.typeOfProduct) flagHave = true; 
        });    
        if(flagHave) {
            this.storage = this.storage.filter((elem) => {
                if(elem.author !== product.author && elem.name !== product.name && elem.typeOfProduct !== product.typeOfProduct) elem;
                else {
                    console.log(`${person.nickname} successfully got the ${product.typeOfProduct} ${product.name}`)
                    person.shielf.push(elem);
                } 
            });  
        }
        else {
            this.createProduct(product.name, product.author, product.typeOfProduct, person);
            this.subscribe({nickname: person.nickname, surname: person.surname, shielf: person.shielf, name: product.name, author: product.author, typeOfProduct: product.typeOfProduct});
        }
    }

    workWithSubs() {
        this.subscribers.forEach((elem) => {
            let person: Person = {nickname: elem.nickname, surname: elem.surname, shielf: elem.shielf};
            let product: Products.Product.Product = {name: elem.name, typeOfProduct: elem.typeOfProduct, author: elem.author};
            this.broadcast <string>(elem);
            this.addToSubs(person, product);
        });
        this.unsubscribeAll();
    }

    addToSubs(person: Person, product: Products.Product.Product) {
       console.log(`${product.typeOfProduct} ${product.name} added to ${person.nickname}`);
       person.shielf.push(product);
       this.storage = this.storage.filter((elem) => {
            if(elem.author !== product.author && elem.name !== product.name && elem.typeOfProduct !== product.typeOfProduct) elem; 
       }); 
    }
}