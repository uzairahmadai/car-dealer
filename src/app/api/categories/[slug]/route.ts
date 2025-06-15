import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import type { AuthenticatedRequest, RouteContext } from '@/middleware/auth';
import Category from '@/models/Category';
import Car from '@/models/Car';
import connectDB from '@/lib/mongodb';

// Get a single category with its cars
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || '-createdAt';

    const category = await Category.findOne({ 
      slug: context.params.slug 
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Get cars in this category with pagination
    const skip = (page - 1) * limit;
    
    const [cars, total] = await Promise.all([
      Car.find({ category: category._id, status: 'available' })
        .populate('seller', 'name')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Car.countDocuments({ category: category._id, status: 'available' })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      success: true,
      category,
      cars,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore
      }
    });
  } catch (error: any) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get category' },
      { status: 500 }
    );
  }
}

// Update category (protected, admin only)
export const PUT = withAuth(async (request: AuthenticatedRequest, context: RouteContext) => {
  try {
    const data = await request.json();

    const category = await Category.findOneAndUpdate(
      { slug: context.params.slug },
      { 
        name: data.name,
        icon: data.icon,
        description: data.description 
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    console.error('Update category error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}, 'admin');

// Delete category (protected, admin only)
export const DELETE = withAuth(async (request: AuthenticatedRequest, context: RouteContext) => {
  try {
    const category = await Category.findOne({ slug: context.params.slug });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category has any cars
    const carsCount = await Car.countDocuments({ category: category._id });
    if (carsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with existing cars' },
        { status: 400 }
      );
    }

    await category.deleteOne();

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    );
  }
}, 'admin');
