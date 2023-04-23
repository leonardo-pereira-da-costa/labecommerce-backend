import { users, prod, purchase, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId, } from "./database";
import { Category, TUsers, TProduct, TPurchases } from "./types";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import exp from "constants";


const app = express();

app.use(express.json());
app.use(cors());
app.listen(3003, ()=>{
    console.log("servidor rodando na porta 3003");
    
})

app.get('/products', (req: Request, res: Response)=>{
    res.status(200).send(prod)
})

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = prod.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response)=>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string
    const newUser: TUsers = {id, email, password}
    users.push(newUser)
    res.status(201).send("Usuario cadastrado com sucesso")
})

app.post('/products', (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as Category
    const newProduct: TProduct = {id, name, price, category}
    prod.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response)=>{
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number
    const newPurchase: TPurchases = {userId,productId,quantity,totalPrice}
    purchase.push(newPurchase)
    res.status(201).send("Compra cadastrada com sucesso")
})