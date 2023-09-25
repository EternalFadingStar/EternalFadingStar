// pages/index.js
'use client'
import { useState } from 'react';
import Card from '../components/Card';

export default function Home() {
  const [cards, setCards] = useState([<Card key={0} />]);

  const addCard = () => {
    setCards([...cards, <Card key={cards.length} />]);
  };

  return (
    <div className="container">
      <button onClick={addCard}>Add Card</button>
      {cards}
    </div>
  );
}


export const config = {
  useClient: true
};
