const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);




//we can create new env with name (production) on the deployment time
// this conditioon if if not deployment the use this secret env if deployent then not use
if(process.env.MODE_ENV !="production"){
    require('dotenv').config(); //it help to use the .env file data

}
// console.log(process.env.SECRET); //PROCESS.ENV.secret GIVE OUR CODE OG ENV FILE WE NEED TO GIVE NAME OF key


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
//express session
const session = require("express-session");
//mongo connect-mongo require
const MongoStore = require("connect-mongo").default;

//connecrt flash
const flash = require("connect-flash");

//----ROUTES---listings js router require
const listingsRouter=require("./routes/listing.js");
//review js router require
const reviewsRouter=require("./routes/review.js");
//user js routes
const userRouter=require("./routes/user.js");

//PASSPORT  -passport require
const passport=require("passport");
//local strategy
const LocalStrategy=require("passport-local");
//User model
const User=require("./models/user.js")


//----comment it because we use mongo atlas url
// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderList";

//------acess atlas url form env
const dbUrl=process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DataBase successful");
}).catch(er => console.group(er));

async function main() {
    await mongoose.connect(dbUrl); // MONGO_URL replace it by dbUrl
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));





//+++++++++++++++++++++++++++++++++++

//---------------CONNECT-MONGO USAGE-------------------------
const store = MongoStore.create({
    mongoUrl: dbUrl, //store on atlas local database
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,  //for lazy update

});

//extra for if error come in store
store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

//----------------------------SESSIONS------------------------------
//exp session options
const sessionOptions={
    store,             //PASS THE CONNECT MONGO VARIABLE
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {    //cookie are use to save page tempory
        expires: Date.now() + 7*24*60*60*1000,   //now date after 7 daty expire cookie(7day-24hrs-60min-60s-1000ms)
        maxAge: 7 * 24 * 60 * 60 * 1000,   //max age expire date
        httpOnly: true,    //by default true
    },
};
app.use(session(sessionOptions));
//FLASH use
//connect flash
app.use(flash());
//-------------------------------------




//------------------------PASSPORT -------------------------------------------------
        
     // it used session the i write code after session-------------
    //passport initilize for all request
app.use(passport.initialize());
    //passport session - used use goes any page the the passport know the it same user
app.use(passport.session());
   //now passport used authenticatoion(login/signup) in used by local strategy
passport.use(new LocalStrategy(User.authenticate()));   //user are model name WHICH TOP REQUIRE

passport.serializeUser(User.serializeUser()); //( serialize)-store user related data serialize into the session 
passport.deserializeUser(User.deserializeUser()); //(deserialize) - remove user related data from session
//---------------------------------------------


//------------------FLASH -MIDDLE WARE--------------------------
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;  //store user data in current user
    next();
});


// //---------------DEMO USER
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email: "student123@gmail.com",
//         username: "delta-student"
//     });
//     //register method check usera arse unique
//     let registereduser=await User.register(fakeUser,"helloworld"); //pass username or password
//     res.send(registereduser);
// });


//---------------------------------
//listing js router used in app
app.use("/listings",listingsRouter); //route require obj

//---------------------------------
//reviews js router used in app
app.use("/listings/:id/reviews",reviewsRouter); //route require obj
//user js router
app.use("/",userRouter);


//check all route  not match the error show in below
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!!.")); //throw error

});

app.use((err, req, res, next) => {
    //express error used and remove the send error
    let {statusCode=500,message="Something Went Wrong!."}=err;
   
    res.status(statusCode).render("listings/error.ejs",{message});
   
    // res.status(statusCode).send(message);
});



app.listen(8080, () => {
    console.log("server is listening on port 8080");
});



// //listings schema middle ware validation
// const validateListing=(req,res,next)=>{
//     let {error}=ListingsSchema.validate(req.body); //it valide with schema js file if statify the work

//     if(error){  //error in result then throw new exp..er..
       
//        let errMsg=error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }
//     else{
//         next();
//     }

// };


//---------------------------------
// //Reviews schema middle ware validation
// const validateReview=(req,res,next)=>{
//     let {error}=ReviewSchema.validate(req.body); //it valide with schema js file if statify the work

//     if(error){  //error in result then throw new exp..er..
       
//        let errMsg=error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }
//     else{
//         next();
//     }

// };
//---- --- --- - -- - - --  -- - - - --  -- -


// //INDEX ROUTE INDEX.EJS VIEW
// app.get("/listings", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({}); //find all listing data and stor in listing variable
//     res.render("listings/index.ejs", { allListings });

// }));


// //NEW ROUTE
// app.get("/listings/new", (req, res) => {
//     res.render("listings/new.ejs");

// });


// //SHOW ROUTE 
// app.get("/listings/:id", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", { listing });
// }));


// //CREATE ROUTE   //valiadte list fun jai schema error ke liye use huva
// app.post("/listings",validateListing, wrapAsync (async(req, res, next) => {
    
//     // if(!req.body.listing){  //error throw
//     //     throw new ExpressError(400,"Send Valid Data For Listings");
//     // }
    

//     // let {title,description,image,price,location,country}=req.params;
//     const newListing = new Listing(req.body.listing); //we can access aur detail from new from body.listiong used because we can make key pair in new ejs file in name
//     await newListing.save();
//     res.redirect("/listings");

// }));


// //EDIT ROUTE
// app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
// }));

// //UPDATE ROUTE
// app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    
//     // if(!req.body.listing){  //error throw
//     //     throw new ExpressError(400,"Send Valid Data For Listings")
//     // }
    
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// }));

// //DELETE ROUITE
// app.delete("/listings/:id", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     let deletedList = await Listing.findByIdAndDelete(id);
//     console.log(deletedList);
//     res.redirect("/listings");
// }));

// //REVIEW ROUTE
// //post review route
// app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
//     let listing=await Listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`);

// }));

// //DELETE REVIEW ROUTE
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
//     let {id,reviewId}=req.params;
//     //it delere review from array review array if any review id match then we can pull it
//     await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});

//     await Review.findByIdAndDelete(reviewId); //t delete review from listing

//     res.redirect(`/listings/${id}`);
// }));

// app.get("/testlisting",async(req,res)=>{
//     let samplelisting=new Listing({
//         title:"My New Villa",
//         description:"by the beach",
//         price: 1200,
//         location:"Calanya,Goa",
//         country:"India",
//     });
//     await samplelisting.save();
//     console.log("sample listing save");
//     res.send("successful testing");

// });

