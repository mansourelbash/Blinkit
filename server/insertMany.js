import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

import mongoose from "mongoose";
import ProductModel from "./models/product.model.js";  // Your Product model
import CategoryModel from "./models/category.model.js";  // Your Category model
import SubCategoryModel from "./models/subCategory.model.js";  // Your SubCategory model

// Replace with your MongoDB connection string
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log("MongoDB connected.");
    await insertProducts();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const insertProducts = async () => {
  try {
    // Step 1: Get categories and subcategories (use your category and subcategory _id)
    const electronicsCategory = await CategoryModel.findOne({ name: "Electronics" });
    const clothingCategory = await CategoryModel.findOne({ name: "Clothing" });
    const sportsCategory = await CategoryModel.findOne({ name: "Sports" });

    const mobilePhonesSubCategory = await SubCategoryModel.findOne({ name: "Mobile Phones" });
    const laptopsSubCategory = await SubCategoryModel.findOne({ name: "Laptops" });
    const mensClothingSubCategory = await SubCategoryModel.findOne({ name: "Men's Clothing" });
    const womensClothingSubCategory = await SubCategoryModel.findOne({ name: "Women's Clothing" });
    const sportsEquipmentSubCategory = await SubCategoryModel.findOne({ name: "Sports Equipment" });

    // Step 2: Dummy product data
    const products = [
      {
        name: "iPhone 13",
        image: ["https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/iphone-13.jpg"],  // Cloudinary URL
        category: [electronicsCategory._id],
        subCategory: [mobilePhonesSubCategory._id],
        unit: "Piece",
        stock: 150,
        price: 999,
        discount: 10,
        description: "Apple iPhone 13 with 128GB storage.",
        publish: true,
      },
      {
        name: "MacBook Pro 16\"",
        image: ["https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/macbook-pro-16.jpg"],  // Cloudinary URL
        category: [electronicsCategory._id],
        subCategory: [laptopsSubCategory._id],
        unit: "Piece",
        stock: 50,
        price: 2399,
        discount: 5,
        description: "Apple MacBook Pro 16-inch with M1 chip.",
        publish: true,
      },
      {
        name: "Men's T-Shirt",
        image: ["https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/mens-t-shirt.jpg"],  // Cloudinary URL
        category: [clothingCategory._id],
        subCategory: [mensClothingSubCategory._id],
        unit: "Piece",
        stock: 200,
        price: 19.99,
        discount: 0,
        description: "Comfortable cotton T-shirt for men.",
        publish: true,
      },
      {
        name: "Women's Jacket",
        image: ["https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/womens-jacket.jpg"],  // Cloudinary URL
        category: [clothingCategory._id],
        subCategory: [womensClothingSubCategory._id],
        unit: "Piece",
        stock: 100,
        price: 59.99,
        discount: 15,
        description: "Stylish women's jacket for the winter.",
        publish: true,
      },
      {
        name: "Sports Tennis Racket",
        image: ["https://res.cloudinary.com/dahms3jim/image/upload/v1234567890/tennis-racket.jpg"],  // Cloudinary URL
        category: [sportsCategory._id],
        subCategory: [sportsEquipmentSubCategory._id],
        unit: "Piece",
        stock: 75,
        price: 89.99,
        discount: 0,
        description: "High-quality tennis racket for professional use.",
        publish: true,
      }
    ];

    // Step 3: Insert products into the database
    const result = await ProductModel.insertMany(products);
    console.log("Products inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and insert data
connectDB();
