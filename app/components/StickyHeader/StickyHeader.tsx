'use client';

import { useState, useEffect, ReactNode } from 'react';
import styles from './StickyHeader.module.css';

interface StickyHeaderProps {
  children: ReactNode;
}

export function StickyHeader({ children }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerInner}>
        {children}
      </div>
    </header>
  );
}
