module.exports=(fn)=>{
   return (req,res,next)=>{
      fn(req,res,next).catch(next);  //error occur the call next
   };
};