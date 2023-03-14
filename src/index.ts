import { users, prod, sacola, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { Categoria } from "./types";

// console.log(users);
// console.log(prod);
// console.log(sacola);

getAllUsers()
createProduct("03", "Boné", 10, Categoria.ACCESSORIES)
getAllProducts()
getProductById("03")

console.log(queryProductsByName("Tenis"));
console.log(createPurchase("03", "Boné", 2, 35))
console.log(getAllPurchasesFromUserId("02"))