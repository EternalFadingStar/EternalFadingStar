// components/Card.js

import { useState } from 'react';

function Card() {
  const [inputValue, setInputValue] = useState('');
  const [permutations, setPermutations] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setPermutations(getPermutations(e.target.value));
  };

  const getPermutations = (string) => {
    if (string.length === 0) return [''];
    const chars = string.split('');
    const result = [];
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const remainingChars = string.slice(0, i) + string.slice(i + 1);
      for (let permutation of getPermutations(remainingChars)) {
        result.push(char + permutation);
      }
    }
    return result;
  };

  return (
    <div className="card">
      <span className="close-btn" onClick={() => setInputValue('')}>X</span>
      <input
        type="text"
        maxLength={4}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter up to 4 digits"
      />
      <textarea readOnly value={permutations.join('\n')} />
      <button onClick={() => setInputValue('')}>Clear</button>
      <button onClick={() => navigator.clipboard.writeText(permutations.join('\n'))}>
        Copy
      </button>
    </div>
  );
}

export default Card;
