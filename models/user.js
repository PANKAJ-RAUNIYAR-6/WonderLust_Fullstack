const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//passport local mongoose
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema=new Schema({
    email:{
        type: String,
        required: true
    },

    //we not need to wriye username ,password,,salting because passport local mongoose can automatic generate saling value,,username,,hashing password


});
userSchema.plugin(passportLocalMongoose); //it use it automatic generate salt,,username,,password,,hashing,password
//setpassword,,authenticare,,resetAttempts,,changepassword ye sab set kr deta hai auto

module.exports=mongoose.model("User",userSchema);