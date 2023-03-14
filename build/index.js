"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("03", "Boné", 10, types_1.Categoria.ACCESSORIES);
(0, database_1.getAllProducts)();
(0, database_1.getProductById)("03");
console.log((0, database_1.queryProductsByName)("Tenis"));
console.log((0, database_1.createPurchase)("03", "Boné", 2, 35));
console.log((0, database_1.getAllPurchasesFromUserId)("02"));
//# sourceMappingURL=index.js.map