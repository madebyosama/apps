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

// Map app names to components + icons
const apps: Record<string, { component: React.ComponentType; icon: string }> = {
  Notes: { component: Notes, icon: '/images/icons/apps/notes.svg' },
  Calculator: {
    component: Calculator,
    icon: '/images/icons/apps/calculator.svg',
  },
  Books: { component: Books, icon: '/images/icons/apps/books.svg' },
  Music: { component: Music, icon: '/images/icons/apps/music.svg' },
  Podcasts: { component: Podcasts, icon: '/images/icons/apps/podcasts.svg' },
  Clock: { component: Clock, icon: '/images/icons/apps/clock.svg' },
  Bookmarks: { component: Bookmarks, icon: '/images/icons/apps/bookmarks.svg' },
};

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');

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
    const AppComponent = apps[selectedApp].component;
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

  // Filter apps by search query
  const filteredApps = Object.keys(apps).filter((appName) =>
    appName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Search bar */}
      <input
        type='text'
        placeholder='Search apps...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {/* App grid */}
      <div className={styles.links}>
        {filteredApps.map((appName) => (
          <div
            key={appName}
            className={styles.linkItem}
            onClick={() => setSelectedApp(appName)}
          >
            <img
              src={apps[appName].icon}
              alt={`${appName} icon`}
              width={48}
              height={48}
              className={styles.icon}
            />
            <p>{appName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
