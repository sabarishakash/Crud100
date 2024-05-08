const mongoose=require("mongoose")
const data_schema=mongoose.Schema({
 Email:{
  type: String,
  required: true,
 },
    name: {
        type: String,
        required: true,
      },
     gender:{
      type: String,
      required: true,
     },
     socialMedia:{
      type: String,
      required: true,
     },
      dob: {
        type: String,
        required: true,
      },
     
     
   
})
module.exports=mongoose.model("crudakash_db",data_schema)