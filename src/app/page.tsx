// pages/index.js
'use client'
import { useState } from 'react';
import Card from '../components/Card';
import AddCard from '../components/AddCard'; // Import the AddCard component

export default function Home() {
  const [cards, setCards] = useState([<Card key={0} />]);

  const addCard = () => {
    setCards([...cards, <Card key={cards.length} />]);
  };

  return (
    <div className="container">
      {cards}
      <AddCard onAdd={addCard} /> {/* Add the AddCard component */}
    </div>
  );
}

export const config = {
  useClient: true
};
