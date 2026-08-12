const express=require("express");
const router=express.Router({mergeParams: true}); //trure help use params data from listing file
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
//controller review
const reviewController=require("../controllers/reviews.js");



//REVIEW ROUTE
//post review route (cont.review.js>line-4)
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

//DELETE REVIEW ROUTE (cont.review.js>line-26)
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);


module.exports=router;