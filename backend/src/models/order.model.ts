import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
    product: mongoose.Types.ObjectId;
    price: number;
    seller: mongoose.Types.ObjectId;
}

export interface OrderDocument extends Document {
    buyer: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    status: "pending" | "confirmed" | "cancelled";
}

const orderItemSchema = new Schema<OrderItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        _id: false
    }
);

const orderSchema = new Schema<OrderDocument>(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;