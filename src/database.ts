import { TUsers, TProduct, TPurchases, Category } from "./types";

export const users: TUsers[] = [
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

function createUser (id: string, email: string, password: string){
    const newUser = {id, email, password}
    users.push(newUser)
    console.log("Cadastro realizado com sucesso!")
}

createUser("Fabricio", "elefafa@hotmail.com", "2526")

export function getAllUsers (){
    console.log(users)
}

getAllUsers()

export const prod: TProduct[] = [
    {
        id: "01",
        name: "Chinelo",
        price: 50,
        category: Category.SHOES
    },

    {
        id: "02",
        name: "Tenis",
        price: 100,
        category: Category.SHOES
    }
]

export function createProduct (id: string, name: string, price: number, category: Category) {
    const newProduct : TProduct = {id, name, price, category}
    prod.push(newProduct)
    console.log("Produto criado com sucesso!")
}

export function getAllProducts() : void {
    console.log(prod)
}

export function getProductById (id: string) {
    prod.find((productf) => {
        if (productf.id === id) {
            return console.log(productf)
        }
    })
}

export function queryProductsByName (q: string) : TProduct[]{
    return prod.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()))
}

export const purchase: TPurchases[] = [
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
]

export function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number) : string{
    purchase.push({userId, productId, quantity, totalPrice})
    return "Compra realizada com sucesso!"
}

export function getAllPurchasesFromUserId (userIdToSearch: string) : TPurchases[] {
    return purchase.filter((purchase) => purchase.userId === userIdToSearch)}

const resultado = purchase.reduce((acc, current)=> acc + (current.quantity*current.totalPrice), 0)

console.log(resultado);


export function creaUsu (id: string, email: string, password: string) : void {
    const novoUsu : TUsers ={
        id,
        email,
        password
    }
}



