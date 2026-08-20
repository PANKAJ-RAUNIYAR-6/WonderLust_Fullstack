const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
        const { search, category } = req.query;

    let allListings;

    if (category) {
        
      allListings = await Listing.find({
            category: category
        });
    } else if (search) {
        
       allListings = await Listing.find({
           
            $or: [
                { title: { $regex: search, $options: "i" } }, 
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }

            ]
        });

    } else {

        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", {
        allListings,
        search,
        category
    });
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

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!.");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


//CREATE ROUTE   
module.exports.createListing = async (req, res, next) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location, 
        limit: 1,  
    })
        .send();
        

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;
    newListing.image = { url, filename }; 
    
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
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!.");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_220"); 
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//UPDATE ROUTE
module.exports.updateListing = async (req, res) => {

        console.log("CATEGORY:", req.body.listing.category);



    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {  
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!..");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;

    let deletedList = await Listing.findByIdAndDelete(id);

    console.log(deletedList);

    req.flash("success", "Listing Deleted!.");

    req.session.save((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/listings");
    });
};