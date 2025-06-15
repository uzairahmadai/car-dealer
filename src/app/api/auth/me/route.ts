import { NextResponse } from 'next/server';
import { withAuth } from '@/middleware/auth';
import type { AuthenticatedRequest } from '@/middleware/auth';
import Car from '@/models/Car';
import User from '@/models/User';

export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user;

    // Get user's listed cars count
    const listedCarsCount = await Car.countDocuments({ seller: user?._id });

    return NextResponse.json({
      success: true,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        createdAt: user?.createdAt,
        listedCarsCount,
      },
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get profile' },
      { status: 500 }
    );
  }
});

// Update user profile
export const PUT = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user;
    const { name, email } = await request.json();

    // Check if email is already taken by another user
    if (email !== user?.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
});

// Delete user account
export const DELETE = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = request.user;

    // Delete user's cars first
    await Car.deleteMany({ seller: user?._id });

    // Delete user
    await User.findByIdAndDelete(user?._id);

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete account' },
      { status: 500 }
    );
  }
});
