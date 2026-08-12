const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
//islogged in middleware if we open crate form if user login then oonly open otherwise need to login
const {isLoggedIn , isOwner , validateListing}=require("../middleware.js");
//contoller listing js  index func
const listingController = require("../controllers/listings.js");
//multer
const multer=require("multer");
//cloudConfig storage
const { storage }=require("../cloudConfig.js");
const upload=multer({storage}); //that use cloud storage
    //const upload=multer({dest: 'uploads/'});uplad are file name where img need to save


//-----------+++++++++++++++++++++++++++++++++++++++++++++++++--------------------------
//router.router()-----Use router.route() to avoid duplicate route naming and thus typing errors.

router.route("/")
  //INDEX ROUTE INDEX.EJS VIEW (cont-listing-line-5)
  .get(wrapAsync(listingController.index))

  //CREATE ROUTE(cont-listin-line-40)  //valiadte list fun jai schema error ke liye use huva
   .post(
      isLoggedIn,
      upload.single('listing[image]'),
      validateListing,
      wrapAsync (listingController.createListing)
   );


//NEW ROUTE (cont-listin-line-12)
router.get(
    "/new", 
    isLoggedIn, 
    listingController.renderNewForm
);


router.route("/:id")
   //SHOW ROUTE (cont-listin-line-19)
   .get(wrapAsync(listingController.showListing))

   //UPDATE ROUTE (cont-listin-line-68)
   .put(
      isLoggedIn,
      isOwner,
      upload.single("listing[image]"),
      validateListing, 
      wrapAsync(listingController.updateListing)
    )
    
   //DELETE ROUITE (cont-listin-line-77)
   .delete(
      isLoggedIn, isOwner,
      wrapAsync(listingController.deleteListing)
    );


//EDIT ROUTE (cont-listin-line-54)
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports=router;