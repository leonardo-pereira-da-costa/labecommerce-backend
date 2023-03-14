import { type } from "os"

export type usuarios = {
    id: string,
    email: string,
    password: string
}

export type produto = {
    id: string,
    name: string,
    price: number,
    category: string
}

export type compras = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

 export enum Categoria {
    CLOTHES = "roupas",
    SHOES = "calçados",
    ACCESSORIES = "acessorios"
}
