import e, { Router } from "express";
import { createPost, updatePost, deletePost } from "../controllers/post.controller.js";
import {
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import {protect} from "../middlewares/auth.js";

const router = Router();
// Protect all admin routes
router.use(protect);

// Admin Post Management
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

// Admin Category Management
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;