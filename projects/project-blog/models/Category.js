import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Category name is required'], 
    trim: true,
    unique: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  description: { 
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);