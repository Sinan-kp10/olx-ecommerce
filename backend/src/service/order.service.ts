import Cart from "../models/cart.model";
import Product from "../models/Product.model.";
import Order from "../models/order.model";
import mongoose from "mongoose";
export const placeOrder = async(userId : string)=>{

    const cart = await Cart.findOne({user : userId}).populate("items.product")

    if(!cart || cart.items.length === 0){
        throw new Error("Your cart is empty")
    }

    const orderItems = []
    let totalAmount = 0

    for (const item of cart.items){

        const product = await Product.findById(item.product._id)

        if(!product){
            throw new Error("Product not found")
        }

        if(product.isSold){
            throw new Error(`${product.title} is already sold`)
        }

        if (product.seller.toString() === userId) {
            throw new Error(`You cannot buy your own product: ${product.title}`)
        }

        orderItems.push({
            product : product._id,
            price : product.price,
            seller : product.seller

        })

        totalAmount += product.price
    }

    const order = await Order.create({
        buyer: new mongoose.Types.ObjectId(userId),
        items: orderItems,
        totalAmount,
        status: "confirmed"
    })

    await Product.updateMany(
    {
        _id: {
            $in: orderItems.map(item => item.product)
        }
    },
    {
        $set: {
            isSold: true
        }
    })

    cart.items = [];
    await cart.save();

    return order;
    
}