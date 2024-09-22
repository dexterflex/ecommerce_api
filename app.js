// main imports 
import 'dotenv/config'
import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser';

// router imports 
import orderRouter from './src/order/orderRoutes.js';
import productRouter from './src/product/productRoute.js';
import userRouter from './src/user/userRoutes.js';
import cartRouter from './src/cart/cartRoutes.js';

// app 
let app = express();

// middlewares 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes 
app.use('/api/auth', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)

// 404 route 
app.use((req, res) => {
    res.status(404).send("Page not Found")
})

// error handler 
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || "Internal Server Error"
    res.status(status).send({ message })
})


export default app;