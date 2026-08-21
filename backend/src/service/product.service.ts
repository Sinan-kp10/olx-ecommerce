import Product from "../models/Product.model."
import { uploadImage } from "./cloudinary.service"
import "multer"

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

export const getMyProducts = async(userId : string) =>{

    const products = await Product.find({
        seller : userId
    }).sort({createdAt : -1})

    return products
}

export const createProduct = async(productData : { title: string; description: string; price: number; category: string; image: Express.Multer.File; seller: string;})=>{

    const imageUrl = await uploadImage(productData.image.buffer);
    const product = await Product.create({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        image: imageUrl,
        seller: productData.seller,
    })

    return product

}

export const updateProduct = async(productId : string, productData:{ title: string; description: string; price: number;category: string;}, 
    file: Express.Multer.File | undefined,userId: string) =>{


    const product = await Product.findOne({
        _id: productId,
        seller: userId
    })

    if (!product) {
        throw new Error("Product not found or you are not the owner");
    }

    if(product.title === productData.title && product.description && productData.description && product.price === productData.price && product.category === productData.category){
        throw new Error("No changes to update.")
    }

    product.title = productData.title
    product.description = productData.description
    product.price = productData.price
    product.category = productData.category

    if (file) {
        const imageUrl = await uploadImage(file.buffer)

        product.image = imageUrl;
    }

    await product.save();

    return product
}

export const deleteProduct = async (productId : string, userId :string)=>{

    const product = await Product.findOneAndDelete({
        _id : productId,
        seller : userId
    })

    if(!product){
        throw new Error("Product not found")
    }

    return product
}