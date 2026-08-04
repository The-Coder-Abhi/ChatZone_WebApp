import React, { useEffect, useState } from 'react';
import { ref, query, orderByChild, startAt, endAt, onValue } from 'firebase/database';
import { db } from '../../services/firebase';
import ChatRecyclerView from '../ChatRecyclerView/ChatRecyclerView';
import {FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './SearchFragment.css';

const SearchFragment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const lowercaseSearch = searchTerm.toLowerCase();

    const searchQuery = query(
      ref(db, 'Users'),
      orderByChild('search'),
      startAt(lowercaseSearch),
      endAt(lowercaseSearch + '\uf8ff')
    );

    const unsubscribe = onValue(searchQuery, (snapshot) => {
      const results = [];
      snapshot.forEach((child) => {
        results.push({ id: child.key, ...child.val() });
      });
      setSearchResults(results);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [searchTerm]);

  const handleClear = () => {
    setSearchTerm('');
  };

  const handleUserClick = (user) => {
    navigate(`/main/chat/${user.id}`, { state: { chatUser: user } });
  };

  return (
    <div className="search-wrapper">
      <div className="search-header">
        <h2>Find Friends</h2>
      </div>

      {/* Input Bar with Search & Clear Icons */}
      <div className="search-bar">
        <span className="search-icon"><FaSearch /></span>
        <input
          type="text"
          placeholder="Search friends by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      {/* Dynamic Results Area */}
      <div className="search-results-container">
        {loading && <div className="search-state-message">Searching for users...</div>}

        {!loading && searchTerm.trim() !== '' && searchResults.length === 0 && (
          <div className="search-state-message">
            <p>No users found matching "<strong>{searchTerm}</strong>"</p>
          </div>
        )}

        {!loading && searchTerm.trim() === '' && (
          <div className="search-state-message placeholder">
            <p>Type a name above to discover friends</p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="search-results-list">
            {searchResults.map((user) => (
              /* Add this clickable div wrapper! */
              <div 
                key={user.id} 
                className="clickable-result"
                onClick={() => handleUserClick(user)}
              >
                <ChatRecyclerView
                  name={user.User_Name}
                  img={user.image_url}
                  status={user.status}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFragment;