import Product from "../models/Product.model."

export const getAllProducts = async()=>{

    const products = await Product.find({isSold : true}).sort({createdAt : -1})

    return products
}

export const getProductById = async(id : string)=> {

    const product = await Product.findOne({
        _id : id,
        isSold : false
    })

    if(!product){
        throw new Error("Product not found")

    }

    return product
}