// pages/index.js
'use client'
import { useState } from 'react';
import Card from '../components/Card';
import AddCard from '../components/AddCard'; // Import the AddCard component
import React from 'react';

export default function Home() {
  const [cards, setCards] = useState([<Card key={0} onDelete={() => deleteCard(0)} />]); // Pass the deleteCard callback

  const addCard = () => {
    const newKey = cards.length;
    setCards([...cards, <Card key={newKey} onDelete={() => deleteCard(newKey)} />]); // Pass the deleteCard callback
  };

  const deleteCard = (keyToDelete: number) => { // Define the type for keyToDelete
    setCards(cards.filter((_, key) => key !== keyToDelete)); // Filter out the card with the given key
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
