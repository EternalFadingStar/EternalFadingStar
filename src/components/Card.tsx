import React, { useState, useRef } from 'react';

// Define the prop types for the Card component
type CardProps = {
    onDelete?: () => void; // Optional onDelete prop
};  

function Card({ onDelete }: CardProps) {
    const [inputValue, setInputValue] = useState<string>(''); // Specify type here
    const inputRef = useRef<HTMLInputElement | null>(null); // Specify type here
    const [permutations, setPermutations] = useState<string[]>([]); // Specify type here
    const [highlightStatus, setHighlightStatus] = useState<Record<string, string>>({}); // Specify type here

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Specify type here
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // If the value is not a number, return
    
        const newDigit = value.slice(-1); // Get the last digit
        if (inputValue.includes(newDigit) && value.length >= inputValue.length) return;
    
        setInputValue(value);
        setPermutations(getPermutations(value));
    };

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    inputRef.current?.focus(); // Use optional chaining here

    if (event.ctrlKey && event.button === 2 && onDelete) {
        onDelete(); // Call the onDelete prop to delete the card
        return; // Exit the function early after deleting the card
    }

    if (event.ctrlKey && event.type === "click") {
        copyToClipboard();
    } else if (event.ctrlKey && event.type === "auxclick") {
        copyToClipboard();
    }
};


    const getPermutations = (string: string): string[] => { // Specify types here
        if (string.length === 0) return [];
    
        const sortedString = [...string].sort().join('');
    
        const generateCombinations = (prefix: string, chars: string, result: Set<string>) => { // Specify types here
            if (prefix.length === 4) {
                if ([...sortedString].every(digit => prefix.includes(digit))) {
                    result.add(prefix);
                }
                return;
            }
            for (let i = 0; i < chars.length; i++) {
                generateCombinations(prefix + chars[i], chars, result);
            }
        };
    
        const result = new Set<string>();
        generateCombinations('', sortedString, result);
    
        return [...result];
    };

    const handlePermutationClick = (perm: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        let newStatus: string = '';

        if (event.type === "click") { // Left click
            newStatus = "red";
        } else if (event.type === "auxclick") { // Middle click
            newStatus = "green";
        } else if (event.type === "contextmenu") { // Right click
            event.preventDefault(); // Prevent the default context menu from showing up
            setHighlightStatus({}); // Clear all highlights
            return;
        }

        setHighlightStatus(prev => ({ ...prev, [perm]: newStatus }));
    };
    
    const copyToClipboard = () => {
        const formatNumberForMarkdown = (num: string) => {
            if (highlightStatus[num] === "red") {
                return `$${num} `;
            } else if (highlightStatus[num] === "green") {
                return `"${num}"`;
            } else {
                return ` ${num} `;
            }
        };
    
        const formatNumberForText = (num: string) => {
            if (highlightStatus[num] === "red") {
                return `~~${num}~~`;
            } else if (highlightStatus[num] === "green") {
                return `_**${num}**_`;
            } else {
                return `${num}`;
            }
        };    
    
        const formattedPermutationsMarkdown = permutations.map(formatNumberForMarkdown);
        const formattedPermutationsText = permutations.map(formatNumberForText);
    
        let clipboardText = "```bash\n-------------------------------------\n";
        for (let i = 0; i < formattedPermutationsMarkdown.length; i += 4) {
            clipboardText += `| ${formattedPermutationsMarkdown[i]} | ${formattedPermutationsMarkdown[i + 1]} | ${formattedPermutationsMarkdown[i + 2]} | ${formattedPermutationsMarkdown[i + 3]} |\n-------------------------------------\n`;
        }
        clipboardText += "```\n";
    
        for (let i = 0; i < formattedPermutationsText.length; i += 4) {
            clipboardText += `${formattedPermutationsText[i]} ${formattedPermutationsText[i + 1]} ${formattedPermutationsText[i + 2]} ${formattedPermutationsText[i + 3]}\n`;
        }
    
        navigator.clipboard.writeText(clipboardText);
    };
    
    
    
    

    return (
        <div className="card" onClick={handleCardClick} onAuxClick={handleCardClick} onContextMenu={handleCardClick}>
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
                        onAuxClick={(e) => handlePermutationClick(perm, e)}
                        onContextMenu={(e) => handlePermutationClick(perm, e)}
                    >
                        {perm}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Card;
