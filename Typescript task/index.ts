import { Store } from "./store/store";
import { Client } from "./person/person";

let myStore: Store = new Store();
let person1: Client = new Client('jeka', 'kazusev', []);
let person2: Client = new Client('jeka1', 'kazusev3', []);
let person3: Client = new Client('jeka2', 'kazusev2', []);
myStore.addProductToUser(person1, {name: 'she', author: 'she', typeOfProduct: 'book'});
myStore.addProductToUser(person2, {name: 'shesd', author: 'she', typeOfProduct: 'book'});
myStore.addProductToUser(person3, {name: 'shesds', author: 'she', typeOfProduct: 'book'});
myStore.addProductToUser(person3, {name: 'shesds', author: 'she', typeOfProduct: 'postcard'});
myStore.getFromTypography();