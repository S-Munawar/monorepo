import { useEffect } from 'react';
import styles from './react-lib.module.css';
import { useState } from 'react';
import type { Game, Review } from '@monorepo/api-interface';
import { API_URL } from '@monorepo/api-interface';

export function Games({ url }: { url: string }) {

  const [games, setGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleReviews = async (id: string) => {
    //
    if (toggle) {
      setReviews(prev => ({...prev, [id]: []}));
      setToggle(false);
    } else {
      await getReviewsById(id);
      setToggle(true);
    }
  }
  const getReviewsById = async (id: string) => {
    try{
      const response = await fetch(`${url}/reviews/${id}`);
      const data = (await response.json()) as Review[];
      setReviews(prev => ({...prev, [id]: data}));
    } catch (error) {
      console.error("Error fetching reviews by ID:", error);
    }
  };

  useEffect(() =>{
  const fetchGames = async () => {
    try {
      const response = await fetch(`${url}/games`);
      const data = (await response.json()) as Game[]; // Type assertion
      setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  }
  fetchGames();
}, []);

  return (
    <div className={styles.container}>
      <h1>Welcome to Games!</h1>
      {games.length > 0 ? (
      games.map(game => (
        <div key={game.id} className={styles.gameCard}>
          <p>{game.name}</p>
          <p>ID: {game.id}</p>
          <p>{game.description}</p>
          <p>Price: ${game.price}</p>
          {game.image && <img src={game.image} alt={game.name} className={styles.gameImage} />}

          <button  onClick={() => toggleReviews(game.id)} className={styles.button}>Get Reviews</button>

          {reviews[game.id]?.length ? (
            <>
              <h3>All Reviews:</h3>
              {reviews[game.id].map((review: Review) => (
                <div className={styles.reviewCard}>
                  <p>Game: {review.game}</p>
                  <p>{review.content}</p>
                  <p>Rating: {review.rating}/5</p>
                </div>
              ))}
            </>
          ) : (
            <p className={styles.noData}>Click to Check Reviews</p>
          )}
          
        </div>
      ))
    ) : ("No Games Available")
      }
    </div>
  );
}

export default Games;



if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html
  
  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  
  it('should render successfully', () => {
    const { baseElement } = render(<Games url={API_URL} />);
    expect(baseElement).toBeTruthy();
  });
  
}

