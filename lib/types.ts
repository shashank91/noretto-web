// Payload CMS Types

export interface PayloadMedia {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  thumbnailURL?: string;
  sizes: {
    thumbnail?: PayloadImageSize;
    square?: PayloadImageSize;
    small?: PayloadImageSize;
    medium?: PayloadImageSize;
    large?: PayloadImageSize;
    xlarge?: PayloadImageSize;
    og?: PayloadImageSize;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PayloadImageSize {
  width: number | null;
  height: number | null;
  mimeType: string | null;
  filesize: number | null;
  filename: string | null;
  url: string | null;
}

export interface PayloadAuthor {
  id: string;
  name: string;
  email?: string;
}

export interface PayloadPost {
  id: string;
  title: string;
  slug: string;
  content: LexicalContent;
  heroImage?: PayloadMedia;
  meta?: {
    title?: string;
    description?: string;
    image?: PayloadMedia;
  };
  populatedAuthors?: PayloadAuthor[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  _status: 'draft' | 'published';
}

export interface PayloadPostsResponse {
  docs: PayloadPost[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Lexical Editor Types
export interface LexicalContent {
  root: LexicalNode;
}

export interface LexicalNode {
  type: string;
  version: number;
  children?: LexicalNode[];
  direction?: 'ltr' | 'rtl' | null;
  format?: string | number;
  indent?: number;
  // Text node properties
  text?: string;
  detail?: number;
  mode?: string;
  style?: string;
  // Link properties
  url?: string;
  newTab?: boolean;
  // List properties
  listType?: 'bullet' | 'number' | 'check';
  tag?: string;
  start?: number;
  // Heading properties
  // tag is reused for headings (h1, h2, etc.)
  // Upload/Media properties
  value?: PayloadMedia;
  relationTo?: string;
  // Block properties (for Media Block, etc.)
  fields?: {
    blockType?: string;
    blockName?: string;
    media?: PayloadMedia;
    // Add other block field types as needed
  };
}
