'use client';

import React from 'react';

interface MoodSelectorProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  typedAuthor: string;
  setTypedAuthor: (author: string) => void;
  setSelectedAuthor: (author: string) => void;
  filteredSuggestions: string[];
  suggestions: string[];
  onSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const moods = [
  { label: 'All Moods', tag: '' },
  { label: 'Inspiration ✨', tag: 'inspirational' },
  { label: 'Philosophy 🧠', tag: 'wisdom,philosophy' },
  { label: 'Romantic 💘', tag: 'love,poetry' },
  { label: 'Literary 📚', tag: 'literature,truth' },
  { label: 'Life 🌱', tag: 'life,motivational' },
];


export default function MoodSelector({
  selectedTag,
  setSelectedTag,
  typedAuthor,
  setTypedAuthor,
  setSelectedAuthor,
  filteredSuggestions,
  suggestions,
  onSubmit,
}: MoodSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Mood Dropdown */}
      <div>
        <label htmlFor="mood" className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
          What’s your vibe?
        </label>
        <select
          id="mood"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        >
          {moods.map((mood) => (
            <option key={mood.tag} value={mood.tag}>
              {mood.label}
            </option>
          ))}
        </select>
      </div>

      {/* Suggestion List */}
      {selectedTag && suggestions.length > 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          ✨ <em>From minds like:</em>{' '}
          {suggestions.map((name, i) => (
            <span
              key={name}
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setTypedAuthor(name);
                setSelectedAuthor(name);
              }}
            >
              {name}
              {i < suggestions.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}

      {/* Author Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Or type an author’s name..."
          value={typedAuthor}
          onChange={(e) => setTypedAuthor(e.target.value)}
          onKeyDown={onSubmit}
          className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        />

        {/* Suggestions List */}
        {filteredSuggestions.length > 0 && (
          <ul className="absolute w-full bg-white dark:bg-zinc-900 border mt-1 rounded shadow z-10 max-h-40 overflow-auto text-sm">
            {filteredSuggestions.map((name) => (
              <li
                key={name}
                onClick={() => {
                  setTypedAuthor(name);
                  setSelectedAuthor(name);
                }}
                className="px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
