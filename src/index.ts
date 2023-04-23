import { users, prod, purchase, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { Category, TUsers, TProduct, TPurchases } from "./types";
import  express, { Request, Response} from 'express';
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(cors());
app.listen(3003, ()=>{
    console.log("servidor rodando na porta 3003");
    
})

app.get('/products', (req: Request, res: Response) => {
    try{
        res.status(200).send(users)
    } catch(error) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send("erro inesperado")
    } 
})

app.get('/users', (req: Request, res: Response) => {
    try{
       res.status(200).send(users) 
    } catch(error) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send("erro inesperado")
    }
    res.status(200).send(users)
})

app.get('/products/search', (req: Request, res: Response) => {
    try{
        const q = req.query.q as string
        if(q.length <1) {
            res.status(400)
            throw new Error("Busca deve ter ao menos um caracter.")
        }
        const result = prod.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
        res.status(200).send(result)
    } catch(error) {
        console.log(error)
        if(res.statusCode === 200) {
            res.status(500)
        }
        res.send("erro inesperado")
    }
})

app.post('/users', (req: Request, res: Response) => {
    try{
        const { id, email, password }: TUsers = req.body

        if(!id){
            res.status(400)
            throw new Error("'id deve ser passado no body")
        }
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser do tipo 'string'")
        }
        if(!email){
            res.status(400)
            throw new Error("'email' deve ser passado no body")
        }
        if(typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser do tipo 'string'")
        }
        if(!password){
            res.status(400)
            throw new Error("'password' deve ser passado no body")
        }
        if(typeof password !== "string"){
            res.status(400);
            throw new Error("'password' deve ser do tipo 'string'")
        }
        
        const searchId = users.find((user) => user.id === id)
        if(searchId){
            res.status(400)
            throw new Error("Id já existente")
        }
        
        const searchEmail = users.find((user) => user.email === email)
        if(searchEmail){
            res.status(400)
            throw new Error("email já cadastrado")
        }
    
        const newUser: TUsers = {
            id,
            email,
            password
        }

        users.push(newUser);
        res.status(201).send("usuário cadastrado com sucesso")

    } catch(error) {
       
    if(res.statusCode === 200){
        res.status(500)
      }
      res.send("erro inesperado") 
    }   
})

app.post('/products', (req: Request, res: Response) => {
    try{
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const category = req.body.category as Category

        if(!id){
            res.status(400)
            throw new Error("'id' deve ser passado no body")
        }
      
        if(!name){
            res.status(400)
            throw new Error("'name' deve ser passado no body")
        }
      
        if(!price){
            res.status(400)
            throw new Error("'price' deve ser passado no body")
        }
      
        if(!category){
            res.status(400)
            throw new Error("'category' deve ser passado no body")
        }
      
        if(id !== undefined){
            if (typeof id !== "string"){
                res.status(400)
                throw new Error("'id' deve ser do tipo 'string'")
            }
        }
      
        if(name !== undefined){
            if(typeof name !== "string"){
                res.status(400)
                throw new Error("'name' deve ser do tipo 'string'")
            }
        }
      
        if(price !== undefined){
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' deve ser do tipo 'number'")
            }
          }

        if(category !== undefined){
            if(
                category !== Category.ACCESSORIES &&
                category !== Category.CLOTHES &&
                category !== Category.SHOES
            )

    {res.status(400)
        throw new Error(
        "'Category' deve ter um tipo válido: 'roupas', 'calçados' e 'acessorios'"
        )
    }
    }
  
    const searchId = prod.find((product) => product.id === id)
        if(searchId){
        res.status(400)
        throw new Error("Id já cadastrado")
    }

    const newProduct: TProduct = { id, name, price, category }
        prod.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso!");
        } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
        res.status(500);
    }
    res.send("erro inesperado");
    }
})

app.post("/purchases", (req: Request, res: Response) => {
    try{
      const{userId, productId, quantity, totalPrice}: TPurchases = req.body
  
    if(!userId){
        res.status(400)
        throw new Error("'userId' deve ser passado no body")
    }
    if(!productId){
        res.status(400)
        throw new Error("'productId' deve ser passado no body")
    }
    if(!quantity){
        res.status(400)
        throw new Error("'quantity' deve ser passado no body")
    }
    if(!totalPrice){
        res.status(400)
        throw new Error("'totalPrice' deve ser passado no body")
    }
    if(userId !== undefined){
        if (typeof userId !== "string"){
          res.status(400)
          throw new Error("'userId' deve ser do tipo 'string'")
        }
    }
    if(productId !== undefined){
        if (typeof productId !== "string"){
          res.status(400)
          throw new Error("'productId' deve ser do tipo 'string'")
        }
    }
    if(quantity !== undefined){
        if (typeof quantity !== "number"){
          res.status(400)
          throw new Error("'quantity' deve ser do tipo 'number'")
        }
    }
      if(totalPrice !== undefined){
        if(typeof totalPrice !== "number"){
          res.status(400)
          throw new Error("'totalPrice' deve ser do tipo 'number'")
        }
    }
    const searchUserId = users.find((user) => user.id === userId)
    if(!searchUserId){
        res.status(404)
        throw new Error(
          "Id deve ter usuario cadastrado"
        )
    }
    const searchProductId =prod.find(
        (product) => product.id === productId
    )
    if(!searchProductId){
        res.status(400)
        throw new Error(
          "Id deve ter produto cadastrado"
        )
    }
    if(searchProductId){
        if(searchProductId.price * quantity !== totalPrice){
          res.status(400)
          throw new Error(
            "Valor não correspondente a quantidade informada"
          );
        }
    }
    const newPurchase: TPurchases = { userId, productId, quantity, totalPrice }
    purchase.push(newPurchase)
    res.status(201).send("Compra efetuada")
    } catch (error) {
      console.log(error);
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send("erro inesperado");
    }
  })

  app.get("/products/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const result = prod.find(prod => prod.id === id)
        if(!result){
            res.status(404)
            throw new Error("Id não corresponde a produto")
        }
        res.status(200).send(result)
    } catch(error){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send("erro inesperado")
    }
})

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const searchUserId = users.find((user) => user.id === id)
        if(!searchUserId) {
            res.status(404)
            throw new Error("Id de usuario inexistente")
    }

    const userPurchase = purchase.filter(
      (purchase) => purchase.userId === id
    )

    res.status(200).send(userPurchase)
    } catch (error){
        console.log(error)
        if (res.statusCode === 200){
        res.status(500)
        }
        res.send("erro inesperado")
      }
})

app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const searchUserId = users.find((user) => user.id === id)
        if(!searchUserId){
        res.status(404)
        throw new Error("usuario não existente, verificar ID")
        }
        const index = users.findIndex((user) => user.id === id)
        if(index){
        users.splice(index, 1)
    }
        res.status(200).send("usuario apagado")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
        res.status(500)
    }
        res.send("erro inesperado")
    }
  })

  app.delete("/products/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const searchProduct = prod.find(product => product.id === id)
        if(!searchProduct){
            res.status(404)
            throw new Error("produto inexistente")
    }
        const index = prod.findIndex((product) => product.id === id)
        if (index){
        prod.splice(index, 1)
    }
        res.status(200).send("produto deletado")
    } catch (error){
      console.log(error)
      if (res.statusCode === 200) {
        res.status(500)
      }
      res.send("erro inesperado")
    }
})

app.put("/users/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const newEmail = req.body.email
        const newPassword = req.body.password
   
        const searchUserId = users.find((user) => user.id === id)
   
    if(!searchUserId){
        res.status(404)
        throw new Error("usuario inexistente")
    }
    if(newEmail !== undefined){
        if(typeof newEmail !== "string"){
            res.status(400)
            throw new Error("email invalido")
        }
    }
    if(newPassword !== undefined){
         if(typeof newPassword !== "string"){
           res.status(400)
           throw new Error("password invalido")
        }
    }

    const result = users.find((user) => user.id === id)
    if(result){
       result.email = newEmail || result.email
       result.password = newPassword || result.password
    }
    res.status(200).send("cadastro atualizado")

    } catch(error){
    console.log(error)
    if(res.statusCode === 200){
        res.status(500)
    }
        res.send("erro inesperado");
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category
    
        const searchProduct = prod.find(product => product.id === id)
    
        if(!searchProduct){
        res.status(404)
        throw new Error("produto não encontrado")
        }
     
        if(newName !== undefined){
        if(typeof newName !== "string"){
            res.status(400)
            throw new Error("name invalid")
        }
        }
        if(newPrice !== undefined){
        if(typeof newPrice !== "number"){
            res.status(400)
            throw new Error("price invalid")
        }
        }
        if(newCategory !== undefined){
            if (
            newCategory !== Category.CLOTHES &&
            newCategory !== Category.SHOES &&
            newCategory !== Category.ACCESSORIES
        ){
            res.status(400)
            throw new Error(
            "informe um tipo válido: 'roupas', 'calçados', 'acessórios'"
        )
        }
        }
        const result = prod.find((product) => product.id === id)
        if (result) {
            result.name = newName || result.name
            result.price = newPrice || result.price
            result.category = newCategory || result.category
        }
        res.status(200).send("produto atualizado")

    } catch(error){
        console.log(error)
        if (res.statusCode === 200) {
        res.status(500)
        }
        res.send("erro inesperado")
        }
})
