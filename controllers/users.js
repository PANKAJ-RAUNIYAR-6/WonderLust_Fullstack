const User=require("../models/user.js");



//get--/sign up form
module.exports.renderSignupForm=(req,res)=>{
   res.render("users/signup.ejs");
};

//post --/signup  user--stor data in database
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        //register in db mean save
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        //is user signup the automatic login to apge
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WonderList !");
            res.redirect("/listings");

        });
    }
    catch(er){
        req.flash("error",er.message);
        res.redirect("/signup");

    }
};

//get - login form 
module.exports.renderLoginForm=(req,res)=>{
   res.render("users/login.ejs");
};

//post--login user
module.exports.login=async(req,res)=>{
    
        req.flash("success","Welcome back to WonderLust!");
        
        // if redirect url are not empty then save if empy the goes to /listings
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl); //redirect that path where it want to go
};


//get--log out user
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out now!");
        res.redirect("/listings");
    });
};