import mongoose from 'mongoose';

let DishesSchema = mongoose.Schema({
    shop_id: String,
    name: String,
    price: Number,
})

export default mongoose.model('dish', DishesSchema)