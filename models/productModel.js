import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          raf: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);


//////////////////////////////////////

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
  
//     category: {
//       type: mongoose.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     discountPrice: {
//       type: Number,
//       default: 0,
//     },
//     ratings: {
//       type: Number,
//       default: 0,
//     },
//     numOfReviews: {
//       type: Number,
//       default: 0,
//     },
//     reviews: [
//       {
//         user: {
//           type: mongoose.Schema.ObjectId,
//           raf: "users",
//           required: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         rating: {
//           type: Number,
//           required: true,
//         },
//         comment: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//     photo: {
//       data: Buffer,
//       contentType: String,
//     },
//     shipping: {
//       type: Boolean,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Products", productSchema);

