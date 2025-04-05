import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Add a tag...', 
  className = '' 
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Parse initial value into tags
  useEffect(() => {
    if (value && typeof value === 'string') {
      setTags(value.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim()));
    }
  }, []);
  
  // Update the parent component when tags change
  useEffect(() => {
    onChange(tags.join(','));
  }, [tags, onChange]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      setInputValue('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div 
      className={`flex flex-wrap items-center gap-2 p-2 border rounded-md ${className}`}
      onClick={focusInput}
    >
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
        >
          <span className="mr-1">{tag}</span>
          <button 
            type="button"
            onClick={() => removeTag(tag)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}
      
      <div className="flex items-center flex-1 min-w-[120px]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 outline-none bg-transparent"
        />
        <button 
          type="button"
          onClick={addTag}
          className="ml-2 text-blue-600 hover:text-blue-800"
          disabled={!inputValue.trim()}
        >
          <FaPlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;