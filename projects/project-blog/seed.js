import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Post from './models/Post.js';
import Category from './models/Category.js';
import Admin from './models/Admin.js';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // 1. Clear existing data
    await Post.deleteMany();
    await Category.deleteMany();
    console.log('🗑️  Existing data cleared.');

    // 2. Create Categories
    const categories = await Category.insertMany([
      { name: 'Travel', slug: 'travel', description: 'World adventures' },
      { name: 'Food', slug: 'food', description: 'Delicious recipes' },
      { name: 'Tech', slug: 'tech', description: 'Coding and gadgets' }
    ]);
    console.log('📁 Categories seeded.');

    // 3. Create Dummy Posts
    const posts = [
      {
        title: 'Exploring the Italian Coast',
        slug: 'exploring-italian-coast',
        content: 'Italy is amazing! Here is a long story about pasta and oceans...',
        excerpt: 'A trip through Italy.',
        status: 'published',
        categories: [categories[0]._id],
        tags: ['italy', 'summer'],
        publishedAt: new Date(),
        media: [{ url: 'https://example.com/italy.jpg', alt: 'Amalfi Coast' }]
      },
      {
        title: 'My Favorite Spicy Ramen Recipe',
        slug: 'spicy-ramen-recipe',
        content: 'Step 1: Boil water. Step 2: Add magic...',
        excerpt: 'The best ramen you will ever taste.',
        status: 'published',
        categories: [categories[1]._id],
        tags: ['cooking', 'ramen', 'spicy'],
        publishedAt: new Date()
      },
      {
        title: 'Building an Express API',
        slug: 'building-express-api',
        content: 'Draft content for a tech blog post...',
        excerpt: 'Coming soon!',
        status: 'draft', // This won't show up in public routes
        categories: [categories[2]._id],
        tags: ['node', 'express']
      }
    ];

    await Post.insertMany(posts);
    console.log('📝 Posts seeded.');
    await Admin.deleteMany();
    await Admin.create({
      username: "admin",
      password: "password123" // The pre-save hook in admin.js will hash this automatically
    });
    console.log('👤 Admin user created.');

    console.log('✅ Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();