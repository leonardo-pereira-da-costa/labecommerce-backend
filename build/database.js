"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creaUsu = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.sacola = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.prod = exports.getAllUsers = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "Léo",
        email: "eloleo@hotmail.com",
        password: "1522"
    },
    {
        id: "Thaila",
        email: "elathai@hotmail.com",
        password: "1322"
    }
];
function createUser(id, email, password) {
    const newUser = { id, email, password };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso!");
}
createUser("Fabricio", "elefafa@hotmail.com", "2526");
function getAllUsers() {
    console.log(exports.users);
}
exports.getAllUsers = getAllUsers;
getAllUsers();
exports.prod = [
    {
        id: "01",
        name: "Chinelo",
        price: 50,
        category: types_1.Categoria.SHOES
    },
    {
        id: "02",
        name: "Tenis",
        price: 100,
        category: types_1.Categoria.SHOES
    }
];
function createProduct(id, name, price, category) {
    const newProduct = { id, name, price, category };
    exports.prod.push(newProduct);
    console.log("Produto criado com sucesso!");
}
exports.createProduct = createProduct;
function getAllProducts() {
    console.log(exports.prod);
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    exports.prod.find((productf) => {
        if (productf.id === id) {
            return console.log(productf);
        }
    });
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.prod.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()));
}
exports.queryProductsByName = queryProductsByName;
exports.sacola = [
    {
        userId: "Léo",
        productId: "01",
        quantity: 4,
        totalPrice: 50
    },
    {
        userId: "Thaila",
        productId: "02",
        quantity: 3,
        totalPrice: 100
    }
];
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.sacola.push({ userId, productId, quantity, totalPrice });
    return "Compra realizada com sucesso!";
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.sacola.filter((sacola) => sacola.userId === userIdToSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
const resultado = exports.sacola.reduce((acc, current) => acc + (current.quantity * current.totalPrice), 0);
console.log(resultado);
function creaUsu(id, email, password) {
    const novoUsu = {
        id,
        email,
        password
    };
}
exports.creaUsu = creaUsu;
//# sourceMappingURL=database.js.map