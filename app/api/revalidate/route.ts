import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Revalidation endpoint for Payload CMS webhooks
 * 
 * Configure in Payload Admin → Settings → Webhooks:
 * - URL: https://your-domain.com/api/revalidate
 * - Events: posts.create, posts.update, posts.delete
 * - Headers: { "x-revalidate-secret": "your-secret-key" }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret
    const secret = request.headers.get('x-revalidate-secret');
    
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const body = await request.json();
    const { collection, slug } = body;

    // Revalidate based on collection type
    if (collection === 'posts') {
      // Revalidate the blog listing page
      revalidatePath('/blog');
      
      // Revalidate the specific post if slug is provided
      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }
    }

    // You can add more collections here as needed
    // if (collection === 'pages') { ... }

    return NextResponse.json({
      revalidated: true,
      collection,
      slug,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

// Also support GET for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  // Revalidate all blog pages
  revalidatePath('/blog');
  
  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
