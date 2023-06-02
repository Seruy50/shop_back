import express from 'express';
import mongoose from 'mongoose';

let OrderSchema = mongoose.Schema({
    dishes: {
        type: Array,
        require: true
    },
    price : {
        type: String,
        require: true
    },
    user_name: {
        type: String,
        require: true
    },
    user_email: {
        type: String,
        require: true
    },
    user_phone: {
        type: Number,
        require: true
    },
    user_adress: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('order', OrderSchema)