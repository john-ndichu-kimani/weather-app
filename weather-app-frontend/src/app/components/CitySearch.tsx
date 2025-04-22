import React, { useState, FormEvent } from 'react';

interface CitySearchProps {
  onSearch: (city: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-2">
        <div className="form-group w-full">
          <input
            type="text"
            placeholder="Enter city name..."
            className="input input-solid max-w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default CitySearch;