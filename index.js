import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import RestarauntSchema from './models/restaraunts.js';
import DishesSchema from './models/dishes.js';

mongoose.connect('mongodb+srv://seruy50:Serjio_Valente50@cluster0.9b7eurn.mongodb.net/main?retryWrites=true&w=majority')
.then(() => console.log('Database OK'))
.catch(err => console.log(err))



const app = express();
app.use(express.json())
app.use(cors());

app.get('/rests', async (req, res) => {
    let rests = await RestarauntSchema.find();
    res.send(rests)
})

app.get('/:id', async (req, res) => {
    console.log(55)
    let id = req.params.id;
    let some = await DishesSchema.find({shop_id: id});
    
    res.json(some);
})

app.post('/orders', async (req, res) => {
    let iDs = await req.body;
    let dishes = [];
    console.log(iDs);
    for(let one of iDs){
        one = await DishesSchema.findById(one);
        dishes.push(one)
    }
        
   
    res.send(dishes)
})

app.listen(3001, err => {
    !err ? console.log('Server OK') : err
})