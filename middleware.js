const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const {ListingsSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");
const {ReviewSchema}=require("./schema.js");


//it used if user login then only create form,,edit form ,,other thing can do if not login the login page are open to login

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {  //it check user are login then form are open it not the not open
    //redirecr url save-- mean if user not login and open create form the it show login page then login that the its come that page only ceate page
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be logged in to create a listing!");  //it flash when user not login
    return res.redirect("/login");
  }
  next();
};

//passport after login id make the session empt the the redirect url path not esy to go then use another middleware
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


//it create only owner can edit its listing not any user can edit other listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  //checl listing id if it not equal to curr uswr id the msg show 
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);

  }
  next();
};


//listings schema middle ware validation
module.exports.validateListing=(req,res,next)=>{
    let {error}=ListingsSchema.validate(req.body); //it valide with schema js file if statify the work

    if(error){  //error in result then throw new exp..er..
       
       let errMsg=error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }

};


//Reviews schema middle ware validation
module.exports.validateReview=(req,res,next)=>{
    let {error}=ReviewSchema.validate(req.body); //it valide with schema js file if statify the work

    if(error){  //error in result then throw new exp..er..
       
       let errMsg=error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }

};


//review ownerr delete only
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  //checl listing id if it not equal to curr uswr id the msg show 
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);

  }
  next();
};