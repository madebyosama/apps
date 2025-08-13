'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import styles from './page.module.css';

// Lazy load each app page
const Notes = lazy(() => import('./notes/page'));
const Calculator = lazy(() => import('./calculator/page'));
const Books = lazy(() => import('./books/page'));
const Music = lazy(() => import('./music/page'));
const Podcasts = lazy(() => import('./podcasts/page'));
const Clock = lazy(() => import('./clock/page'));
const Bookmarks = lazy(() => import('./bookmarks/page'));

// Map app names to components
const apps: Record<string, React.ComponentType> = {
  Notes,
  Calculator,
  Books,
  Music,
  Podcasts,
  Clock,
  Bookmarks,
};

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage once on mount
  useEffect(() => {
    const savedApp = localStorage.getItem('selectedApp');
    if (savedApp && apps[savedApp]) {
      setSelectedApp(savedApp);
    }
    setIsLoaded(true);
  }, []);

  // Save to storage when selection changes
  useEffect(() => {
    if (selectedApp) {
      localStorage.setItem('selectedApp', selectedApp);
    }
  }, [selectedApp]);

  if (!isLoaded) return null;

  // If app is selected, render it with Back button
  if (selectedApp) {
    const AppComponent = apps[selectedApp];
    return (
      <div className={styles.appContainer}>
        <div className={styles.appHeader}>
          <button
            onClick={() => {
              localStorage.removeItem('selectedApp');
              setSelectedApp(null);
            }}
          >
            ⬅ Back to Home
          </button>
        </div>
        <Suspense fallback={<div>Loading {selectedApp}...</div>}>
          <AppComponent />
        </Suspense>
      </div>
    );
  }

  // Main home page
  return (
    <div className={styles.container}>
      <h1>Welcome to the App</h1>
      <p>Please select an app to continue:</p>
      <div className={styles.buttonGroup}>
        {Object.keys(apps).map((appName) => (
          <button key={appName} onClick={() => setSelectedApp(appName)}>
            {appName}
          </button>
        ))}
      </div>
    </div>
  );
}
