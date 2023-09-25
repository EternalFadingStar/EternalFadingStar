import { useState, useRef } from 'react';

function Card() {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [permutations, setPermutations] = useState([]);
    const [highlightStatus, setHighlightStatus] = useState({});

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // If the value is not a number, return
    
        const newDigit = value.slice(-1); // Get the last digit
        // If the digit is already in the set and the new value's length is not less than the current value, return
        if (inputValue.includes(newDigit) && value.length >= inputValue.length) return;
    
        setInputValue(value);
        setPermutations(getPermutations(value));
    };
    
    
    const handleCardClick = () => {
        inputRef.current.focus(); // Focus the input when the card is clicked

        if (event.ctrlKey && event.type === "click") { // Ctrl + Left click
            copyToClipboard();
        } else if (event.ctrlKey && event.type === "auxclick") { // Ctrl + Middle click
            // Logic to delete the card
            // This will require some changes in the parent component to actually remove the card
            // For now, I'll just log a message
            console.log("Delete card");
        }
    };

    const getPermutations = (string) => {
        if (string.length === 0) return [];
    
        const sortedString = [...string].sort().join(''); // Sort the string in ascending order
    
        const generateCombinations = (prefix, chars, result) => {
            if (prefix.length === 4) {
                // Check if every digit from the sortedString appears at least once in the prefix
                if ([...sortedString].every(digit => prefix.includes(digit))) {
                    result.add(prefix);
                }
                return;
            }
            for (let i = 0; i < chars.length; i++) {
                generateCombinations(prefix + chars[i], chars, result);
            }
        };
    
        const result = new Set();
        generateCombinations('', sortedString, result);
    
        return [...result];
    };

    const handlePermutationClick = (perm, event) => {
        event.stopPropagation(); // Stop the event from bubbling up
    
        let newStatus = {};
    
        if (event.type === "click" && event.altKey) { // Ctrl + Left click
            newStatus = highlightStatus[perm] === "green" ? "default" : "green";
        } else if (event.type === "click") { // Just Left click
            newStatus = highlightStatus[perm] === "red" ? "default" : "red";
        } else if (event.type === "auxclick") { // Middle click
            setHighlightStatus({}); // Reset all highlights
            return;
        }
    
        setHighlightStatus(prev => ({ ...prev, [perm]: newStatus }));
    };
    
        
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(permutations.join('\n'));
    };

    return (
        <div className="card" onClick={handleCardClick} onAuxClick={handleCardClick}>
            
            <div className="input-container" data-digit-count={inputValue.length}>
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="digit-box">
                        {inputValue[index] || ''}
                    </div>
                ))}    
            </div>
        
            <input
                ref={inputRef}
                className="card-input"
                type="text"
                maxLength={4}
                value={inputValue}
                onChange={handleInputChange}
                pattern="\d*"
            />
    
            <div className="permutations-container">
                {permutations.map((perm, index) => (
                    <div
                    key={index}
                    className={`permutation ${highlightStatus[perm] || ''}`}
                    onClick={(e) => handlePermutationClick(perm, e)}
                    onContextMenu={(e) => handlePermutationClick(perm, e)}
                    onAuxClick={(e) => handlePermutationClick(perm, e)}
                >
                    {perm}
                </div>
                
                ))}
            </div>
        </div>
    );    
}

export default Card;
