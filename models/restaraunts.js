import mongoose from 'mongoose';

let RestarauntSchema = mongoose.Schema({
    name: String
})

export default mongoose.model('restoraunt', RestarauntSchema);