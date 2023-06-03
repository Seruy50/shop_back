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
    try {
        let rests = await RestarauntSchema.find();
        res.send(rests)
    } catch (error) {
        res.status(500).json({ message: 'Can not get shops' })
    }      
})

app.get('/shops/:id', async (req, res) => { 
    try {
        let id = req.params.id;
        let dishes = await DishesSchema.find({ shop_id: id });
        res.send(dishes);
    } catch (error) {
        res.status(500).json({ message: 'Can not get dishes from id' })
    }   
})

app.post('/order', async (req, res) => {
    try {
        let body = req.body;

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
    } catch (error) {
        res.status(500).json({ message: "Can not create an order" });
    }
    
    
})

app.listen(process.env.port, err => {
    !err ? console.log('Server OK') : console.log(err)
})