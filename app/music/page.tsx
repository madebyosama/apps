'use client';

import { useEffect, useState } from 'react';
import styles from './music.module.css';
import Image from 'next/image';

interface Song {
  link: string;
  thumbnail: string;
  singer: string;
  title: string;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch('/data/music.json')
      .then((res) => res.json())
      .then((data: Song[]) => setSongs(data))
      .catch((err) => console.error('Error loading music:', err));
  }, []);

  return (
    <div className={styles.main}>
      <div>
        {songs.map((song, index) => (
          <div key={index} className={styles.song}>
            <Image
              src={song.thumbnail}
              alt={`${song.title} thumbnail`}
              width={512}
              height={512}
            />
            <div>
              <div className={styles.songTitle}>{song.title}</div>
              <div className={styles.songSinger}>{song.singer}</div>
              <audio
                className={styles.audio}
                controls
                loop
                src={song.link}
              ></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
