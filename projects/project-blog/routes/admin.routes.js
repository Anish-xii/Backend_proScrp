import e, { Router } from "express";
import { createPost, updatePost, deletePost } from "../controllers/post.controller.js";
import {
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import {protect} from "../middlewares/auth.js";
import upload from '../config/cloudinary.js';

const router = Router();
// Protect all admin routes
router.use(protect);

// Admin Post Management
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // This URL is what you will store in your Post "media" array
  res.status(200).json({ 
    url: req.file.path, 
    public_id: req.file.filename 
  });
});

// Admin Category Management
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;