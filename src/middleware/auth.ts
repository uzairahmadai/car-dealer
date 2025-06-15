import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export interface RouteParams {
  params: {
    [key: string]: string;
  };
}

export type RouteHandler = (
  req: AuthenticatedRequest,
  params: RouteParams
) => Promise<NextResponse>;

export async function authenticateUser(
  request: NextRequest,
  params: RouteParams
): Promise<NextResponse | User> {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Please provide a valid authentication token' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return user as User;

  } catch (error) {
    return NextResponse.json(
      { error: 'Not authorized to access this route' },
      { status: 401 }
    );
  }
}

export function authorizeRoles(...roles: string[]) {
  return async (request: NextRequest, params: RouteParams): Promise<NextResponse | User> => {
    const result = await authenticateUser(request, params);

    if (result instanceof NextResponse) {
      return result;
    }

    if (!roles.includes(result.role)) {
      return NextResponse.json(
        { error: `Role (${result.role}) is not authorized to access this route` },
        { status: 403 }
      );
    }

    return result;
  };
}

export function withAuth(handler: RouteHandler, ...roles: string[]) {
  return async (request: NextRequest, params: RouteParams): Promise<NextResponse> => {
    try {
      const authFunction = roles.length > 0 ? authorizeRoles(...roles) : authenticateUser;
      const result = await authFunction(request, params);

      if (result instanceof NextResponse) {
        return result;
      }

      // Add user to request for use in handler
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = result;

      return handler(authenticatedRequest, params);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
