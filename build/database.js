"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sacola = exports.prod = exports.users = void 0;
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
exports.prod = [
    {
        id: "01",
        name: "tenis",
        price: 50,
        category: "casual"
    },
    {
        id: "02",
        name: "tenis",
        price: 100,
        category: "corrida"
    }
];
exports.sacola = [
    {
        userid: "Léo",
        productid: "01",
        quantity: 4,
        totalPrice: 50
    },
    {
        userid: "Thaila",
        productid: "02",
        quantity: 3,
        totalPrice: 100
    }
];
const resultado = exports.sacola.reduce((acc, current) => acc + (current.quantity * current.totalPrice), 0);
console.log(resultado);
//# sourceMappingURL=database.js.map