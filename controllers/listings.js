const Listing = require("../models/listing.js");
//mapbox sdk github require
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
//access token requires
const mapToken = process.env.MAP_TOKEN;
//BASE CLIENT of mbxGeocoding FROM GITHUB
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//controller can store the backend functions

//routes listing js index route (lin-14)fun
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}); //find all listing data and stor in listing variable
    res.render("listings/index.ejs", { allListings });

};

////NEW ROUTE
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");

};

//SHOW ROUTE
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        }).populate("owner");

    //if the listing not exist the flash a failure msg
    if (!listing) {
        //FLASH -FAILURE msg show
        req.flash("error", "Listing you requested for does not exist!.");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


//CREATE ROUTE   //valiadte list fun jai schema error ke liye use huva
module.exports.createListing = async (req, res, next) => {

     //we use forward geocode to covert location into coordinates
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,  //it can take location from listing and cob=vert in geocodes
        limit: 1,  //set limit 1 mean it gives only 1 coordeinate or place
    })
        .send();
        

    let url = req.file.path;
    let filename = req.file.filename;

    // let {title,description,image,price,location,country}=req.params;
    const newListing = new Listing(req.body.listing); //we can access aur detail from new from body.listiong used because we can make key pair in new ejs file in name
    //save owner data in new create listing
    newListing.owner = req.user._id;
    //save url,filename of upload imge in new listing in database
    newListing.image = { url, filename }; //save url or filename in database
    
    //access coordinates from geomerty from feature array idex 0
    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    //FLASH - msg show
    req.flash("success", "New Listing Created!..");
    res.redirect("/listings");
};

//EDIT ROUTE
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    //if the listing not exist the flash a failure edit msg
    if (!listing) {
        //FLASH -FAILURE msg show
        req.flash("error", "Listing you requested for does not exist!.");
        return res.redirect("/listings");
    }
    //for preview image in edit page
    let originalImageUrl = listing.image.url;  //acess url of image
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_220"); //replace /uplad by /uplad/h_300,w_250 that help low the quality image

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//UPDATE ROUTE
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    //update
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    //update image at edit card
    if (typeof req.file !== "undefined") {  //if file exist then the below work
        //acess url,filename from cloudinary
        let url = req.file.path;
        let filename = req.file.filename;
        //stor that url,filename in image
        listing.image = { url, filename };
        //again save after change
        await listing.save();
    }


    //FLASH - Update listing msg show
    req.flash("success", "Listing Updated!..");
    res.redirect(`/listings/${id}`);
};

//DELETE ROUITE
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    //FLASH -DELETE  msg show
    req.flash("success", "Listing Deleted!.");
    res.redirect("/listings");
};