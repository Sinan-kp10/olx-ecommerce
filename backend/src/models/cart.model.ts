import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
    product: mongoose.Types.ObjectId;
}

export interface CartDocument extends Document {
    user: mongoose.Types.ObjectId;
    items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    {
        _id: false
    }
);

const cartSchema = new Schema<CartDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        items: {
            type: [cartItemSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model<CartDocument>("Cart", cartSchema);

export default Cart;