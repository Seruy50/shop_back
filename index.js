import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import RestarauntSchema from './models/restaraunts.js';
import DishesSchema from './models/dishes.js';
import OrderSchema from './models/orders.js'

mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.9b7eurn.mongodb.net/main?retryWrites=true&w=majority`)
.then(() => console.log('Database OK'))
.catch(err => console.log(err))



const app = express();
app.use(express.json())
app.use(cors());

app.get('/shops', async (req, res) => {
    let rests = await RestarauntSchema.find();
    res.send(rests)
})

app.get('/shops/:id', async (req, res) => {
    let some = await DishesSchema.find({shop_id: req.params.id});
    res.json(some);
})

app.post('/order', async (req, res) => {
    let body = await req.body;

    let doc = new OrderSchema({
        dishes: body.dishes,
        price: body.orderPrice,
        user_name: body.user_name,
        user_email: body.user_email,
        user_phone: body.user_phone,
        user_adress: body.user_adress
    })

    await doc.save();

    

    res.send('Order done');
})

app.listen(3001, err => {
    !err ? console.log('Server OK') : err
})