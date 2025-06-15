import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import type { AuthenticatedRequest, RouteContext } from '@/middleware/auth';
import Category from '@/models/Category';
import connectDB from '@/lib/mongodb';

// Get all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'name';
    const order = searchParams.get('order') || 'asc';

    const categories = await Category.find()
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .select('name slug icon description count');

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get categories' },
      { status: 500 }
    );
  }
}

// Create a new category (protected, admin only)
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const data = await request.json();

    // Create category
    const category = await Category.create({
      name: data.name,
      icon: data.icon,
      description: data.description,
    });

    return NextResponse.json({
      success: true,
      category,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create category error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}, 'admin');
