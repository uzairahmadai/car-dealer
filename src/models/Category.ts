import mongoose, { Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  description?: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon'],
  },
  description: {
    type: String,
    trim: true,
  },
  count: {
    type: Number,
    default: 0,
    min: [0, 'Count cannot be negative'],
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
categorySchema.index({ name: 'text' });
categorySchema.index({ slug: 1 });

// Update count when cars are added/removed
categorySchema.methods.updateCount = async function() {
  const Car = mongoose.models.Car;
  const count = await Car.countDocuments({ category: this._id, status: 'available' });
  this.count = count;
  await this.save();
};

// Pre-save middleware to ensure slug is created from name
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Handle the case where the model might already be compiled
const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;
