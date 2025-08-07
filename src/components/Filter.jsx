import React from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../data/mockProducts';
import '../styles/Filter.css';

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="filters-container">
      <h3 className="filters-title">
        <Filter size={20} className="filter-icon" />
        Filters
      </h3>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Min Price</label>
          <input 
            type="number"
            value={filters.minPrice === "" ? "" : filters.minPrice}
            onChange={(e) => {
              const value = e.target.value;
              setFilters(prev => ({
                ...prev,
                minPrice: value === "" ? "" : Number(value)
              }));
            }}
            className="filter-input"
            placeholder="0"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Max Price</label>
          <input 
            type="number"
            value={filters.maxPrice === "" ? "" : filters.maxPrice}
            onChange={(e) => {
              const value = e.target.value;
              setFilters(prev => ({
                ...prev,
                maxPrice: value === "" ? "" : Number(value)
              }));
            }}
            className="filter-input"
            placeholder="1000"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
