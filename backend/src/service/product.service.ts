import Product from "../models/Product.model."

export const getAllProducts = async()=>{

    const products = await Product.find({isSold : false}).sort({createdAt : -1})

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

export const createProduct = async(productData : { title: string; description: string; price: number; category: string; image: string; seller: string;})=>{

    const product = await Product.create({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        image: productData.image,
        seller: productData.seller,
    })

    return product

}