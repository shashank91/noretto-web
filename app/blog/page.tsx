import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getMediaUrl, extractExcerpt } from '@/lib/payload';
import { PayloadPost } from '@/lib/types';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | noretto',
  description: 'Insights, updates, and stories from the noretto team.',
  openGraph: {
    title: 'Blog | noretto',
    description: 'Insights, updates, and stories from the noretto team.',
    type: 'website',
  },
};

export default async function BlogPage() {
  let posts: PayloadPost[] = [];
  let error = null;

  try {
    const response = await getPosts({ limit: 12 });
    posts = response.docs;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load posts';
    posts = [];
  }

  return (
    <div className={styles.container}>
      {/* Background effects matching main page */}
      <div className={styles.backgroundEffects}>
        <div className={`${styles.orb} ${styles.orbTopLeft}`} />
        <div className={`${styles.orb} ${styles.orbBottomRight}`} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          <span>noretto</span>
        </Link>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Insights, updates, and stories from our journey.
          </p>
        </div>

        {error && (
          <div className={styles.error}>
            <p>Unable to load posts. Please try again later.</p>
          </div>
        )}

        {posts.length === 0 && !error && (
          <div className={styles.empty}>
            <p>No posts yet. Check back soon!</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className={styles.grid}>
            {posts.map((post) => {
              const heroUrl = post.heroImage?.sizes?.medium?.url || post.heroImage?.url;
              const excerpt = extractExcerpt(post.content);
              const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className={styles.card}
                >
                  {heroUrl && (
                    <div className={styles.cardImage}>
                      <Image
                        src={getMediaUrl(heroUrl)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                      />
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    <time className={styles.date}>{date}</time>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    {excerpt && (
                      <p className={styles.excerpt}>{excerpt}</p>
                    )}
                    <span className={styles.readMore}>
                      Read more <span className={styles.arrow}>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 noretto. All rights reserved.</p>
      </footer>
    </div>
  );
}
