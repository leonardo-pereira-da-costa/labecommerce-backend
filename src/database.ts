import { usuarios, produto, compras } from "./types";

export const users: usuarios[] = [
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
]

export const prod: produto[] = [
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
]

export const sacola: compras[] = [
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
]

const resultado = sacola.reduce((acc, current)=> acc + (current.quantity*current.totalPrice), 0)

console.log(resultado);