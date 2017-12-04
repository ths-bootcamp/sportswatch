const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
	isBooked: Boolean,
	day: String,
	user: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username:String
	}
});

module.exports = mongoose.model('Date',dateSchema);