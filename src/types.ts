export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt?: string 
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchases = {
    id: string,
    buyer: string,
    products: {
        id: string,
        quantity: number
    }[]
}

export type TUsersDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: string
}

export type TProductsDB = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}