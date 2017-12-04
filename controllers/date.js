const Venue = require("../models/Venue");
const Date = require("../models/Date");

//route to book a slot
exports.bookSlot = (req,res) => {
	Venue.findById({_id:req.params.id}, function(err, venue){
		if(err){res.json(err)}else{
			res.json(venue)
		}
		//we enter a form the day to book for the venue.
		//then on click of a button this route is called and that day is booked, by setting isBooked true for the day.
		var newDate = {isBooked: true, day:req.body.day};
		Date.create(newDate,function (err,date) {
			if(err){res.json(err)}else{
				res.json(venue)
			}
			//assigning the user who booked the venue for that day.
			date.user.id = req.user._id;
			date.user.username = req.user.profile.name;
			date.save();
			//after assigning the date to the venue, view the venue.
			res.json(venue);
		});
	});
}


//route to view all booked slots
exports.viewSlots = (req,res) => {
	Venue.findById({_id:req.params.id}).populate('dates',null,{ isBooked: true }).exec(function(err,venue){
		if(err){res.json(err)}else{
			res.json(venue)
		}
	});
};
