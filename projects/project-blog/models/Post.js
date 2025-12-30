import mongoose from "mongoose";
import slugify from "../utils/slugify.js";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true }, // Markdown or HTML string
  excerpt: { type: String }, // For SEO and preview cards
  
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },

  // Relationships
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  }],
  
  tags: [String], // Free-form tags like ['vegan', 'quick-fix']

  // Flexible Media Array
  media: [{
    mediaType: { type: String, enum: ['image', 'video', 'audio'], default: 'image' },
    url: { type: String, required: true },
    alt: String,
    metadata: { type: Map, of: String } // For things like "duration" or "dimensions"
  }],

  publishedAt: { type: Date },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save hook to generate slug from title
PostSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title);
  }
});

// Optimization: Indexing for Search
// This allows you to perform $text searches across title and content
PostSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.model("Post", PostSchema);