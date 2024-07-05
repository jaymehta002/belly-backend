import mongoose, {Schema} from "mongoose";


const productSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    brand: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    categoryName: {
      type: String, 
    },
    stock: {
      type: Number,
      required: true,
      min: 0, 
    },
    stockStatus: {
      type: Boolean,
      default: true, 
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100, 
    },
    productType: {
      type: String,
      trim: true,
    },
    imageUrls: {
      type: [String],
    //   validate: {
    //     validator: (urls) => urls.every((url) => URLValidator.isURL(url)),
    //     message: (props) => `${props.value} is not a valid URL`,
    //   },
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    isRecommended: {
        type: Boolean,
        default: false,
        },
   
  },
  {
    timestamps: true
}
);
  
  export const product = mongoose.model('product', productSchema);
