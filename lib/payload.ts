import { PayloadPost, PayloadPostsResponse } from './types';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

/**
 * Fetch all published posts from Payload CMS
 */
export async function getPosts(options?: {
  limit?: number;
  page?: number;
}): Promise<PayloadPostsResponse> {
  const { limit = 10, page = 1 } = options || {};
  
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    limit: String(limit),
    page: String(page),
    depth: '1', // Populate relationships one level deep
  });

  const res = await fetch(`${PAYLOAD_URL}/api/posts?${params}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '1',
  });

  const res = await fetch(`${PAYLOAD_URL}/api/posts?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const data: PayloadPostsResponse = await res.json();
  return data.docs[0] || null;
}

/**
 * Fetch all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    limit: '100',
    depth: '0',
  });

  const res = await fetch(`${PAYLOAD_URL}/api/posts?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return [];
  }

  const data: PayloadPostsResponse = await res.json();
  return data.docs.map((post) => post.slug);
}

/**
 * Get full media URL from Payload
 */
export function getMediaUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${PAYLOAD_URL}${path}`;
}

/**
 * Extract excerpt from Lexical content
 */
export function extractExcerpt(content: PayloadPost['content'], maxLength = 160): string {
  if (!content?.root?.children) return '';
  
  let text = '';
  
  const extractText = (nodes: typeof content.root.children): void => {
    for (const node of nodes) {
      if (node.type === 'text' && node.text) {
        text += node.text + ' ';
      }
      if (node.children) {
        extractText(node.children);
      }
      if (text.length > maxLength) break;
    }
  };
  
  extractText(content.root.children);
  
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trim() + '...';
}
