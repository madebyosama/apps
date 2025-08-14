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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://opensheet.elk.sh/1oSDi5i4mwb3M4jDVazuvQDmjSQxNhsAfggNhNTh1kQ4/1'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Song[] = await response.json();
        setSongs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

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
