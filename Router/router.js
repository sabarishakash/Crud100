const express=require("express")
const { Post_data, Get_data, Update_data, Delete_data,get_up } = require("../crud")
const router=express.Router()
router.post("/create",Post_data)
router.get("/get",Get_data)
router.put("/update/:id",Update_data)
router.delete("/delete/:id",Delete_data)

module.exports=router