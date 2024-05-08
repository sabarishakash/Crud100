const data_schema=require("./schema")
const Post_data=async(req,res)=>{
    const data=new data_schema({
        ...req.body
    })

    const save_data=await data.save()
    res.json(save_data)
}

const Get_data=async(req,res)=>{
    const find_data=await data_schema.find({})
    res.json(find_data)
}

const Delete_data=async(req,res)=>{
    const delete_data=await data_schema.findByIdAndDelete(req.params.id)
    res.json({message:"Deleted successfully",delete:delete_data})
}


const Update_data=async(req,res)=>{
    const update_data=await data_schema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.json({message:"Updated successfully",update:update_data})
}


module.exports={Post_data,Get_data,Update_data,Delete_data}