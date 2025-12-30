import Post from "../models/Post.js";
import slugify from '../utils/slugify.js';

export const getPosts = async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 10 } = req.query;

    // Build the query object
    const query = { status: 'published' };

    if (category) query.categories = category; // Expects Category ID
    if (tag) query.tags = tag;
    if (search) query.$text = { $search: search }; // Uses the text index we defined in the model

    // Execute query with pagination
    const posts = await Post.find(query)
      .populate('categories', 'name slug')
      .sort({ publishedAt: -1 }) // Newest first
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.status(200).json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalResults: count
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Get a single post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' })
      .populate('categories');
      
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// --- ADMIN ACTIONS ---

export const createPost = async (req, res) => {
  try {
    // If status is published but no date provided, set it to now
    if (req.body.status === 'published' && !req.body.publishedAt) {
      req.body.publishedAt = Date.now();
    }
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Error creating post", error });
  }
};

export const updatePost = async (req, res) => {
  try {
    // 1. If the title is changed, we need a new slug
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,           // Return the modified document rather than the original
        runValidators: true  // Ensure the update obeys the Schema rules
      }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Update successful", post });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted permanently" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

