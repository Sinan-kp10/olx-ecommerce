import mongoose from "mongoose";
import Product from "../models/Product.model."
import Cart from "../models/cart.model";


export const getCart = async(userId: string)=>{
    const cart = await Cart.findOne({
        user :userId
    }).populate("items.product")

    if(!cart){
        return{
            user : userId,
            items : []
        }
    }
    return cart
}


export const addToCart = async(productId : string, userId : string)=>{

    const product = await Product.findById(productId)

    if (!product) {
        throw new Error("Product not found");
    }


    if (product.isSold) {
        throw new Error("Product is already sold");
    }


    if (product.seller.toString() === userId) {
        throw new Error("You cannot add your own product to cart")
    }

    let cart = await Cart.findOne({ user : userId})

    if(!cart){
        cart = await Cart.create({
            user : userId,
            items : [
                {
                    product : productId
                }
            ]
        })

        return cart
    }

    const alreadyInCart = cart.items.some( item => item.product.toString()=== productId)

    if (alreadyInCart) {
        throw new Error("Product is already in your cart")
    }

    cart.items.push({
        product : new mongoose.Types.ObjectId(productId)
    })

    await cart.save()

    return cart


}

export const removeFromCart = async ( productId: string, userId: string) => {

    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const productExists = cart.items.some(
        item => item.product.toString() === productId
    )

    if(!productExists){
        throw new Error("Product is not in your cart");
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save()

    await cart.populate("items.product");

    return cart
};