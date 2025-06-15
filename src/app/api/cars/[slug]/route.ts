import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import type { AuthenticatedRequest, RouteParams } from '@/middleware/auth';
import { prisma } from '@/lib/prisma';

// Get a single car by slug
export async function GET(
  request: NextRequest,
  params: RouteParams
) {
  try {
    const car = await prisma.car.findUnique({
      where: { slug: params.params.slug },
      include: { category: true }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error: any) {
    console.error('Get car error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get car' },
      { status: 500 }
    );
  }
}

// Update car (protected route)
export const PUT = withAuth(async (request: AuthenticatedRequest, params: RouteParams) => {
  try {
    const data = await request.json();

    // Check if car exists
    const car = await prisma.car.findUnique({
      where: { slug: params.params.slug }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Update car
    const updatedCar = await prisma.car.update({
      where: { slug: params.params.slug },
      data,
      include: { category: true }
    });

    return NextResponse.json(updatedCar);
  } catch (error: any) {
    console.error('Update car error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update car' },
      { status: 500 }
    );
  }
});

// Delete car (protected route)
export const DELETE = withAuth(async (request: AuthenticatedRequest, params: RouteParams) => {
  try {
    // Check if car exists
    const car = await prisma.car.findUnique({
      where: { slug: params.params.slug }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Delete car
    await prisma.car.delete({
      where: { slug: params.params.slug }
    });

    return NextResponse.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete car error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete car' },
      { status: 500 }
    );
  }
});
