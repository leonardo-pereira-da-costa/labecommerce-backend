import { usuarios, produto, compras, Categoria } from "./types";

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

export const prod: produto[] = [
    {
        id: "01",
        name: "Chinelo",
        price: 50,
        category: Categoria.SHOES
    },

    {
        id: "02",
        name: "Tenis",
        price: 100,
        category: Categoria.SHOES
    }
]

export function createProduct (id: string, name: string, price: number, category: Categoria) {
    const newProduct : produto = {id, name, price, category}
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

export function queryProductsByName (q: string) : produto[]{
    return prod.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()))
}

export const sacola: compras[] = [
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
    sacola.push({userId, productId, quantity, totalPrice})
    return "Compra realizada com sucesso!"
}

export function getAllPurchasesFromUserId (userIdToSearch: string) : compras[] {
    return sacola.filter((sacola) => sacola.userId === userIdToSearch)}

const resultado = sacola.reduce((acc, current)=> acc + (current.quantity*current.totalPrice), 0)

console.log(resultado);


export function creaUsu (id: string, email: string, password: string) : void {
    const novoUsu : usuarios ={
        id,
        email,
        password
    }
}



