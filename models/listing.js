const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

//listening schema create
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    //review used in all listings
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    //owner of a listing each
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    //create it for access the coordinate store it in database
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],  //array of two number
            required: true
        },

    },

});

//mongo middleware
//POST SCHEMA FOR LISTINGS that delete review or that which the listing delete
listingSchema.post("findOneAndDelete", async (listing) => {
    //delte in listing . reviewss array all the reviews can delete
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });

    };
});




const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
