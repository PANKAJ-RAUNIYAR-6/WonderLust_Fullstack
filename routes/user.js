const express=require("express");
const router=express.Router(); 
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");

//--------------SIGN UP ---------------------
router.route("/signup")
    //get--/sign up form (cont-users.js-line--5)
   .get(userController.renderSignupForm)

   //post --/signup user -(cont-users.js-line--10)---stor data in database
   .post(wrapAsync(userController.signup));


//--------------------LOGIN------------------
router.route("/login")
   //get - login form (cont-users.js-line--5)
   .get(userController.renderLoginForm)

   //post--login user (cont-users.js-line--5)
   //passport authe.-- i miideele ware that check login user are alreday register matach detail from DB
   .post(saveRedirectUrl,passport.authenticate
       (
          "local",
           { 
              failureRedirect:'/login',
              failureFlash:true
            }
        ),
        userController.login
    );


//-------------------LOG OUT USER---------------------
//get--log out user (cont-users.js-line--5)
router.get(
    "/logout",
    userController.logout
);


module.exports=router;