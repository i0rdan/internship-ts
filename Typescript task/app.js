"use strict";
class Postcard {
    constructor(name, author, typeOfProduct) {
        this.name = name;
        this.author = author;
        this.typeOfProduct = typeOfProduct;
    }
}
class Book {
    constructor(name, author, typeOfProduct) {
        this.name = name;
        this.author = author;
        this.typeOfProduct = typeOfProduct;
    }
}
class BuisnessCard {
    constructor(name, author, typeOfProduct) {
        this.name = name;
        this.author = author;
        this.typeOfProduct = typeOfProduct;
    }
}
class Typography {
    constructor(label, director, store) {
        this.label = label;
        this.director = director;
        this.store = store;
        this.timeForCreateBook = 3000;
        this.timeForCreatePostCard = 4000;
        this.timeForCreateBuisnessCard = 5000;
        if (!label || !director || store.length) {
            throw new TypeError('Properties should be correct!');
        }
    }
    createProduct(name, author, typeOfProduct) {
        switch (typeOfProduct) {
            case 'book':
                let newBook = new CreatorOfBook(this.label, this.director, this.store)
                    .createProduct(name, author, 'book');
                setTimeout(() => {
                    this.store.push(newBook);
                }, this.timeForCreateBook);
                break;
            case 'postcard':
                let newPostcard = new CreatorOfPostcard(this.label, this.director, this.store)
                    .createProduct(name, author, 'postcard');
                setTimeout(() => {
                    this.store.push(newPostcard);
                }, this.timeForCreatePostCard);
                break;
            case 'buisness card':
                let newBuisnessCard = new CreatorOfBuisnessCard(this.label, this.director, this.store)
                    .createProduct(name, author, 'buisness card');
                setTimeout(() => {
                    this.store.push(newBuisnessCard);
                }, this.timeForCreateBuisnessCard);
                break;
        }
    }
}
class CreatorOfBook extends Typography {
    createProduct(name, author, typeOfProduct) {
        return new Book(name, author, typeOfProduct);
    }
}
class CreatorOfPostcard extends Typography {
    createProduct(name, author, typeOfProduct) {
        return new Postcard(name, author, typeOfProduct);
    }
}
class CreatorOfBuisnessCard extends Typography {
    createProduct(name, author, typeOfProduct) {
        return new BuisnessCard(name, author, typeOfProduct);
    }
}
class Store {
    constructor() {
        this.typography = new Typography('Mamms', 'Yauheni', []);
        this.storage = [{ name: 'shesd', author: 'she', typeOfProduct: 'book' }];
        this.subscribers = [];
    }
    createProduct(name, author, typeOfProduct, person) {
        console.log(`Dear ${person.nickname}, we sended request for your ${typeOfProduct}, ${name}`);
        this.typography.createProduct(name, author, typeOfProduct);
    }
    getFromTypography() {
        setInterval(() => {
            if (this.typography.store.length) {
                this.storage = this.typography.store;
                this.typography.store = [];
                console.log('New products from typography added to store.');
                this.workWithSubs();
            }
            else {
                console.log('No items to add');
            }
        }, 6000);
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    unsubscribeAll() {
        this.subscribers = [];
    }
    broadcast(subscriber) {
        return `${subscriber['nickname']}, your ${subscriber.typeOfProduct} added to our store.`;
    }
    addProductToUser(person, product) {
        let flagHave = false;
        this.storage.forEach((elem) => {
            if (elem.author === product.author && elem.name === product.name && elem.typeOfProduct === product.typeOfProduct)
                flagHave = true;
        });
        if (flagHave) {
            this.storage = this.storage.filter((elem) => {
                if (elem.author !== product.author && elem.name !== product.name && elem.typeOfProduct !== product.typeOfProduct)
                    elem;
                else {
                    console.log(`${person.nickname} successfully got the ${product.typeOfProduct} ${product.name}`);
                    person.shielf.push(elem);
                }
            });
        }
        else {
            this.createProduct(product.name, product.author, product.typeOfProduct, person);
            this.subscribe({ nickname: person.nickname, surname: person.surname, shielf: person.shielf, name: product.name, author: product.author, typeOfProduct: product.typeOfProduct });
        }
    }
    workWithSubs() {
        this.subscribers.forEach((elem) => {
            let person = { nickname: elem.nickname, surname: elem.surname, shielf: elem.shielf };
            let product = { name: elem.name, typeOfProduct: elem.typeOfProduct, author: elem.author };
            this.broadcast(elem);
            this.addToSubs(person, product);
        });
        this.unsubscribeAll();
    }
    addToSubs(person, product) {
        console.log(`${product.typeOfProduct} ${product.name} added to ${person.nickname}`);
        person.shielf.push(product);
        this.storage = this.storage.filter((elem) => {
            if (elem.author !== product.author && elem.name !== product.name && elem.typeOfProduct !== product.typeOfProduct)
                elem;
        });
    }
}
class Client {
    constructor(nickname, surname, shielf) {
        this.nickname = nickname;
        this.surname = surname;
        this.shielf = shielf;
    }
    addToShielf(book) {
        this.shielf.push(book);
    }
}
let myStore = new Store();
let person1 = new Client('jeka', 'kazusev', []);
let person2 = new Client('jeka1', 'kazusev3', []);
let person3 = new Client('jeka2', 'kazusev2', []);
myStore.addProductToUser(person1, { name: 'she', author: 'she', typeOfProduct: 'book' });
myStore.addProductToUser(person2, { name: 'shesd', author: 'she', typeOfProduct: 'book' });
myStore.addProductToUser(person3, { name: 'shesds', author: 'she', typeOfProduct: 'book' });
myStore.addProductToUser(person3, { name: 'shesds', author: 'she', typeOfProduct: 'postcard' });
myStore.getFromTypography();
