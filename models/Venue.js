const mongoose = require("mongoose");

const sportsSchema =new mongoose.Schema({
    name: String
})

const photosSchema = new mongoose.Schema({
    imageLink: String
})

const reviewsSchema = new mongoose.Schema({
    review:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
})

const venueSchema = new mongoose.Schema({
    name : { type: String, unique: true },
    address: String,
    email: String,
    phone: Number,
    description: String,
    sports: [sportsSchema],
    photos: [photosSchema],
    reviews: [reviewsSchema],
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
})

const Venue = mongoose.model("Venue", venueSchema)

module.exports = Venue