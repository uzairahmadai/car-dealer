import mongoose, { Document, Model } from 'mongoose';

export interface ICar extends Document {
  title: string;
  price: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  description: string;
  features: string[];
  specifications: Map<string, string>;
  status: 'available' | 'sold' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const carSchema = new mongoose.Schema<ICar>({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  mileage: {
    type: String,
    required: [true, 'Please provide mileage'],
    trim: true,
  },
  fuelType: {
    type: String,
    required: [true, 'Please provide fuel type'],
    trim: true,
  },
  transmission: {
    type: String,
    required: [true, 'Please provide transmission type'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category'],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a seller'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
  features: [{
    type: String,
    trim: true,
  }],
  specifications: {
    type: Map,
    of: String,
    default: new Map(),
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available',
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
carSchema.index({ title: 'text', description: 'text' });
carSchema.index({ slug: 1 });
carSchema.index({ category: 1 });
carSchema.index({ seller: 1 });
carSchema.index({ status: 1 });
carSchema.index({ price: 1 });

// Handle the case where the model might already be compiled
const Car = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);

export default Car;
