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

    });


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

///////////////////////////////////////////////////////////////////////////
  /////////////////////Review section///////////////////////////////////
///////////////////////////////////////////////////////////////////////////
exports.makeReview=(req,res)=>{
    Venue.findOne({_id:req.params.id},function (err, venue) {
        if (err) {
            req.flash('errors', {msg: 'Something wrong Rating'})
        }
        console.log(req.body);
        venue.reviews.push({rating:req.body.rating,description:req.body.description,user:req.params.idUser});
        venue.save( function (err) {
            if (err) { req.flash('errors', { msg: 'can not save' }); }

            res.json({"result":"this is result after save the data!!"})
        });
    })
};

exports.reviewList = function(req,res){
    Venue.findOne({
        _id: req.params.id
    })
        // .populate('reviews.rating')
        // .populate("reviews.user")
        .select("reviews.rating reviews.user reviews.description")
        .exec(
            function(err, venue) {
                if (err) res.status(500).send(err);

                res.json(venue.reviews);
            });
};

exports.reviewEdit = function (req, res) {
    Venue.findOneAndUpdate(     {
            _id: req.params.id,
            "reviews.user":req.params.idUser
        },
        {
            "$set": {
                "reviews.$.rating":req.body.rating,
                "reviews.$.description":req.body.description,
            }
        },{ new: true }, function (err,venueEdit) {

            res.json({venueEdit:venueEdit,result:"ur done for editing!!"});
        })
};

exports.reviewDelete = function (req, res) {
    var user = req.params.idUser;
    // Venue.findOne({_id:req.params.id}, function(err, venue){
    //     console.log(venue.reviews, user);
    //     venue.reviews.pull({rating: "5a0eb3233bab066d50735747"});
    //     console.log(venue.reviews);
    //     venue.save();
    //     res.json({venue:venue, result:"now u delete the reviews"});
    // });

    Venue.update({_id:req.params.id},
        {$pull: {reviews: {user: user}}}
    ,function(){
        res.json({ result:"now u delete the reviews"});

    })
};


