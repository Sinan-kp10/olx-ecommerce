import Product from "../models/Product.model."

export const getAllProducts = async()=>{

    const products = await Product.find({isSolid : true}).sort({createdAt : -1})

    return products
}