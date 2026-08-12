const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


//post review route
module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
//add author name
    newReview.author=req.user._id;
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    //FLASH -new Review msg show
    req.flash("success","New Review Created!.");

    res.redirect(`/listings/${listing._id}`);

};


//DELETE REVIEW ROUTE
module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    //it delere review from array review array if any review id match then we can pull it
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});

    await Review.findByIdAndDelete(reviewId); //t delete review from listing
//FLASH - delete Review msg show
    req.flash("success","Review Deleted!..");
    res.redirect(`/listings/${id}`);
};
