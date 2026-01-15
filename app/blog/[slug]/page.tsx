import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs, getMediaUrl, extractExcerpt } from '@/lib/payload';
import { RichText } from '@/app/components/RichText/RichText';
import { ReadingProgress } from '@/app/components/ReadingProgress/ReadingProgress';
import { ShareButton } from '@/app/components/ShareButton/ShareButton';
import styles from './post.module.css';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Use dynamic rendering - pages are generated on-demand, not at build time
// This prevents build failures when Payload is not accessible
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    // Return empty array if Payload is not accessible during build
    // Pages will be generated on-demand (SSR)
    console.warn('Could not fetch post slugs during build:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found | noretto',
      };
    }

    const description = post.meta?.description || extractExcerpt(post.content);
    const ogImage = post.meta?.image?.sizes?.og?.url || post.heroImage?.sizes?.og?.url;

    return {
      title: `${post.meta?.title || post.title} | noretto`,
      description,
      openGraph: {
        title: post.meta?.title || post.title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        images: ogImage ? [{ url: getMediaUrl(ogImage) }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta?.title || post.title,
        description,
        images: ogImage ? [getMediaUrl(ogImage)] : undefined,
      },
    };
  } catch (error) {
    console.warn('Could not generate metadata:', error);
    return {
      title: 'Blog | noretto',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const heroUrl = post.heroImage?.sizes?.large?.url || post.heroImage?.url;
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Estimate reading time
  const wordCount = extractExcerpt(post.content, 10000).split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className={styles.container}>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Background effects */}
      <div className={styles.backgroundEffects}>
        <div className={`${styles.orb} ${styles.orbTopLeft}`} />
        <div className={`${styles.orb} ${styles.orbBottomRight}`} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Article */}
      <article className={styles.article}>
        {/* Breadcrumb navigation */}
        <nav className={styles.breadcrumb}>
          <Link href="/blog" className={styles.breadcrumbLink}>
            ← Back to Blog
          </Link>
          <ShareButton />
        </nav>
        {/* Hero Image */}
        {heroUrl && (
          <div className={styles.heroWrapper}>
            <div className={styles.hero}>
              <Image
                src={getMediaUrl(heroUrl)}
                alt={post.title}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className={styles.heroImage}
              />
            </div>
          </div>
        )}

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt}>{publishedDate}</time>
            <span className={styles.separator}>·</span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          {post.populatedAuthors && post.populatedAuthors.length > 0 && (
            <div className={styles.authors}>
              {post.populatedAuthors.map((author) => (
                <span key={author.id} className={styles.author}>
                  {author.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content - Light Section */}
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <RichText content={post.content} />
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Link href="/blog" className={styles.footerLink}>
            ← More posts
          </Link>
          <Link href="/" className={styles.footerLink}>
            noretto home
          </Link>
        </div>
        <p className={styles.copyright}>© 2026 noretto. All rights reserved.</p>
      </footer>
    </div>
  );
}
