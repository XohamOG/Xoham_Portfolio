'use client';

import React, { useEffect, useState } from 'react';
import CallChip from './CallChip';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [status, setStatus] = useState<'running' | 'done'>('running');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Single clean call resolving
    const t1 = setTimeout(() => {
      setStatus('done');
    }, 950);

    // Smooth fade out after checkmark animation completes
    const t2 = setTimeout(() => {
      setIsLoaded(true);
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className={`${styles.overlay} ${isLoaded ? styles.overlayHidden : ''}`} aria-hidden={isLoaded}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.chipWrapper}>
        <CallChip
          icon="terminal"
          name="xoham"
          argument="portfolio.init()"
          status={status}
          expectedMs={950}
          size={38}
          radius={12}
          color="#f4f4f5"
          surfaceColor="#121217"
          progressColor="#007BA7"
          progressOpacity={0.18}
          doneColor="#10b981"
          washOpacity={0.16}
          showTimer={true}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.04)',
          }}
        />
      </div>
    </div>
  );
}
