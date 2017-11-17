const Venue = require("../models/Venue")

exports.createVenue = (req, res) => {



    const venue = new Venue({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        // sports:[],
        // author:{
        //     id: req.user._id,
        //     username: req.user.username
        // }

    })


    Venue.findOne({name: req.body.name}, (err, existingvenue) => {
        if (err) {
            return next(err);
        }else if(existingvenue){
            return res.send("Venue with that name already exits");
        }

        venue.save((err, venue) => {
            if (err) {
                res.json({result: err})
            } else {
                res.json({venue: venue})
                // res.send("Venue created")
            }
        })
    })
}

exports.getVenue = (req, res) => {
    Venue.find({}, function (err, venue) {
        if(err){
            res.json(err)
        }else{
            res.json(venue)
        }
    })
}

exports.viewVenue = (req, res) => {
    Venue.findById({_id:req.params.id}, function(err, venue){
        if(err){res.json(err)}else{
            res.json(venue)
        }
    })
}
exports.editVenue = (req, res) => {
    Venue.findOneAndUpdate({_id:req.params.id}, req.body, {new: true}, function(err, venue){
        if(err){res.json(err)}else{
            // res.json(venue);
            res.send("Venue Updated successfully");
        }
    })
}

exports.deleteVenue = (req, res) =>{
    Venue.deleteOne({_id:req.params.id},function(err, venue){
        if(err){
            res.json(err);
        }else{
            // res.json(venue);
            res.send("Venue deleted Successfully")
        }
    })
}