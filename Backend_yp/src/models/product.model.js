const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Basic product information
    brand: {
      type: String,
      default: "Fordax",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Useful if your frontend currently uses "title"
    title: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Product price
    // Catalogue does not provide prices, so this is optional
    price: {
      type: Number,
      min: 0,
    },

    // Product images
    image: [
      {
        type: String,
        trim: true,
      },
    ],

    // Features of the product
    features: [
      {
        type: String,
        trim: true,
      },
    ],

    // Where/how the product can be used
    application: [
      {
        type: String,
        trim: true,
      },
    ],

    // Used for products that have multiple applications
    applications: [
      {
        type: String,
        trim: true,
      },
    ],

    // Available colours
    availableColours: [
      {
        type: String,
        trim: true,
      },
    ],

    // Alternative name appearing on packaging
    alternateNameOnPack: {
      type: String,
      trim: true,
    },

    // Surface types
    surfaceTypes: [
      {
        type: String,
        trim: true,
      },
    ],

    // Things the product removes
    removes: [
      {
        type: String,
        trim: true,
      },
    ],

    // Crack-related information for Crack Filler
    crackCapacityInDescription: {
      type: String,
      trim: true,
    },

    crackCapacityShownOnPack: {
      type: String,
      trim: true,
    },

    // Product pack-size information
    packSizes: {
      type: String,
      trim: true,
    },

    // Additional notes from catalogue
    note: {
      type: String,
      trim: true,
    },

    // PDF page from which the product data/image came
    imageSource: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
