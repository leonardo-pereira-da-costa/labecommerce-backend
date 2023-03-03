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
    userid: string,
    productid: string,
    quantity: number,
    totalPrice: number
}