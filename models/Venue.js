const mongoose = require("mongoose");

const sportsSchema =new mongoose.Schema({
    name: String
})

const photosSchema = new mongoose.Schema({
    imageLink: String
})

const reviewsSchema = new mongoose.Schema({
    rating:Number,
    // user:{
    //     id:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     },
    //     username:String
    // },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     unique: true
    // },
    description:String
});

const venueSchema = new mongoose.Schema({
    name : { type: String},
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