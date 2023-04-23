import { type } from "os"

export type TUsers = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: string
}

export type TPurchases = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

 export enum Category {
    CLOTHES = "roupas",
    SHOES = "calçados",
    ACCESSORIES = "acessorios"
}
