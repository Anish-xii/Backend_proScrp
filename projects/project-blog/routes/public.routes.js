import { Router } from "express";
import { getPosts, getPostBySlug } from "../controllers/post.controller.js";
import { getAllCategories } from "../controllers/category.controller.js";
import { login } from '../controllers/auth.controller.js';

const router = Router();

// Post Routes
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);
router.post('/admin/login', login);

// Category Routes
router.get('/categories', getAllCategories);

export default router;