import mongoose, {Document, Schema}from "mongoose"

interface IProduct extends Document {
    title : string
    description : string
    price : number
    category : string
    image : string
    seller : mongoose.Types.ObjectId
    isSold : boolean 
}

const ProductSchema = new Schema<IProduct>({

    title : {
        type : String,
        required : true
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },

    image: {
        type: String,
        required: true,
    },

    seller : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
        trim : true
    },
    isSold : {
        type : Boolean,
        default : false
    }

    },
    {
        timestamps : true
    }

)

const Product = mongoose.model<IProduct>("Product", ProductSchema)

export default Product