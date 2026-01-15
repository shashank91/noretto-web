import { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | noretto',
  description: 'Learn more about noretto and our mission.',
  openGraph: {
    title: 'About | noretto',
    description: 'Learn more about noretto and our mission.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Background effects */}
      <div className={styles.backgroundEffects}>
        <div className={`${styles.orb} ${styles.orbTopLeft}`} />
        <div className={`${styles.orb} ${styles.orbBottomRight}`} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>About noretto</h1>
          
          <div className={styles.section}>
            <p className={styles.lead}>
              We&apos;re building something exceptional.
            </p>
            <p className={styles.text}>
              noretto is crafting innovative solutions that will transform the way you work. 
              Our team is dedicated to creating products that are both powerful and delightful to use.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.subtitle}>Our Mission</h2>
            <p className={styles.text}>
              We believe in building technology that empowers people. Our mission is to create 
              tools that are intuitive, efficient, and beautifully designed.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.subtitle}>What&apos;s Coming</h2>
            <p className={styles.text}>
              We&apos;re currently in stealth mode, working hard on our first product. 
              Sign up for our newsletter to be the first to know when we launch.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 noretto. All rights reserved.</p>
      </footer>
    </div>
  );
}
