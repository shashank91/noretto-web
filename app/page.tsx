import { EmailForm } from "./components/EmailForm/EmailForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background effects */}
      <div className={styles.backgroundEffects}>
        <div className={`${styles.orb} ${styles.orbTopLeft}`} />
        <div className={`${styles.orb} ${styles.orbBottomRight}`} />
        <div className={`${styles.orb} ${styles.orbCenter}`} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Main content */}
      <main className={styles.main}>
        {/* Logo/Brand */}
        <div className={styles.brand}>
          <h1 className={styles.logo}>noretto</h1>
          <div className={styles.divider} />
        </div>

        {/* Status badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot}>
            <span className={styles.badgePing} />
            <span className={styles.badgeDotInner} />
          </span>
          <span className={styles.badgeText}>Currently brewing</span>
        </div>

        {/* Tagline */}
        <div className={styles.tagline}>
          <p>Something exceptional is on the way.</p>
          <p className={styles.taglineSecondary}>
            Be the first to know when we launch.
          </p>
        </div>

        {/* Email form */}
        <EmailForm />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 noretto. All rights reserved.</p>
      </footer>
    </div>
  );
}
