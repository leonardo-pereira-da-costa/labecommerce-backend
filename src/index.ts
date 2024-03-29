import { TUsers, TProduct, TPurchases, TUsersDB, TProductsDB } from "./types"
import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/users", async (req: Request, res: Response) => {
    try {

        const userData: TUsersDB[] = await db("users")

        const response: TUsers[] = userData.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.created_at
            }
        })

        res.status(200).send(response)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.post("/users", async (req: Request, res: Response) => {
    try {

        const { id, name, email, password } = req.body

        if (!id || !name || !email || !password) {
            throw new Error("Necessário informar id, name, email e password")
        }

        if (typeof id !== "string" || typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("Tipo de id, name, email e password precisam ser do tipo string")
        }

        const [idExists] = await db("users").where({ id })

        if (idExists) {
            throw new Error("Id já cadastrado")
        }

        const [emailExists] = await db("users").where({ email })

        if (emailExists) {
            throw new Error("Email já cadastrado")
        }

        const newUser: TUsers = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)

        res.status(201).send({ message: "Cadastro realizado com sucesso" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.get("/products", async (req: Request, res: Response) => {
    try {

        const name: string = req.query.name as string

        let data: TProductsDB[];

        if (name) {
            data = await db("products").whereLike("name", `%${name}`)
        } else {
            data = await db("products")
        }

        const response: TProduct[] = data.map((prod) => {
            return {
                id: prod.id,
                name: prod.name,
                price: prod.price,
                description: prod.description,
                imageUrl: prod.image_url
            }
        })

        res.status(200).send(response)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.post("/products", async (req: Request, res: Response) => {
    try {

        const { id, name, price, description, imageUrl }: TProduct = req.body

        if (!id || !name || !price || !description || !imageUrl) {
            throw new Error("Necessário informar id, name, price, description e imageUrl")
        }

        if (typeof id !== "string" || typeof name !== "string" || typeof price !== "number" || typeof description !== "string" || typeof imageUrl !== "string") {
            throw new Error("Tipo de id, name, description e imageUrl precisam ser do tipo string e price precisa ser do tipo number")
        }

        const [idExists] = await db("products").where({ id })

        if (idExists) {
            throw new Error("Id já cadastrado")
        }

        const newProduct: TProductsDB = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        await db("products").insert(newProduct)

        res.status(201).send({ message: "Produto cadastrado com sucesso" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.put("/products/:id", async (req: Request, res: Response) => {
    try {

        const idToEdit: string = req.params.id

        const { id, name, price, description, imageUrl }: TProduct = req.body

        if (id) {
            if (typeof id !== "string") {
                throw new Error("id precisa ser do tipo string")
            }
        }

        if (name) {
            if (typeof name !== "string") {
                throw new Error("name precisa ser do tipo string")
            }
        }

        if (price) {
            if (typeof price !== "number") {
                throw new Error("price precisa ser do tipo number")
            }
        }

        if (description) {
            if (typeof description !== "string") {
                throw new Error("description precisa ser do tipo string")
            }
        }

        if (imageUrl) {
            if (typeof imageUrl !== "string") {
                throw new Error("imageUrl precisa ser do tipo string")
            }
        }

        const [idExists]: TProductsDB[] = await db("products").where({ id: idToEdit })

        if (!idExists) {
            throw new Error("id inválido")
        }

        const newProduct: TProductsDB = {
            id: id || idExists.id,
            name: name || idExists.name,
            price: price || idExists.price,
            description: description || idExists.description,
            image_url: imageUrl || idExists.image_url
        }

        await db("products").update(newProduct).where({ id: idToEdit })
        res.status(200).send({ message: "Produto editado com sucesso" })

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.post("/purchases", async (req: Request, res: Response) => {
    try {

        const { id, buyer, products }: TPurchases = req.body

        if (!id || !buyer || !products) {
            throw new Error("Necessário passar informações de id, buyer e products")
        }

        if (typeof id !== "string" || typeof buyer !== "string") {
            throw new Error("id e buyer precisam ser do tipo string")
        }

        const isProdValid = Array.isArray(products)

        if (isProdValid === false) {
            throw new Error("product precisa ser um array")
        }

        const [idValid] = await db("purchases").where({ id })

        if (idValid) {
            throw new Error("id já cadastrado")
        }

        const [isBuyerValid] = await db("users").where({ id: buyer })

        if (!isBuyerValid) {
            throw new Error("id do usuário inválido")
        }

        const productsIds = products.map(prod => prod.id)

        const productsExists: TProductsDB[] = await db("products").whereIn("id", productsIds)

        if (products.length > productsExists.length) {
            throw new Error("Verifique os ids dos produtos")
        }

        const totalPrice = productsExists.map((product) => {
            const productToSom = products.find(prod => prod.id === product.id)

            if (productToSom) {
                return product.price * productToSom.quantity
            }

            return 0
        }).reduce((total, price) => total + price, 0)

        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice
        }

        await db("purchases").insert(newPurchase)

        await db("purchases_products").insert(products.map((prod) => ({
            purchase_id: id,
            product_id: prod.id,
            quantity: prod.quantity
        })))

        res.status(201).send("Pedido realizado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const [idExists] = await db("purchases").where({ id })

        if (!idExists) {
            throw new Error("id da compra é inválido")
        }

        await db("purchases_products").del().where({ purchase_id: id })
        await db("purchases").del().where({ id })
        res.status(200).send("Pedido deletado com sucesso")

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {

        const id = req.params.id

        const [idExists] = await db("purchases").where({ id })

        if (!idExists) {
            throw new Error("id da compra inválido")
        }

        const purchaseResponse = await db("purchases AS pur")
            .select(
                "pur.id AS purchaseId",
                "u.id AS buyerId",
                "u.name AS buyerName",
                "u.email AS buyerEmail",
                "pur.total_price AS totalPrice",
                "pur.created_at AS createdAt"
            )
            .innerJoin("users AS u", "u.id", "=", "pur.buyer")
            .where("pur.id", "=", id)

        const productResponse = await db("products AS pro")
            .select(
                "pro.id AS id",
                "pro.name AS name",
                "pro.price AS price",
                "pro.description AS description",
                "pro.image_url AS imageUrl",
                "pur.quantity AS quantity"
            )
            .innerJoin("purchases_products AS pur", "pur.product_id", "=", "pro.id")
            .where("pur.purchase_id", "=", id)

        const result = { ...purchaseResponse[0], products: [...productResponse] }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
})