import React, { useState, useEffect } from 'react';
import {
  displayNewestPosts,
  displayOldestPosts,
  displayActivePosts,
  getPostsByIDs
} from '../components/helperFunctions'; 

export function SearchResults({ filteredPosts, searchQuery, M }) {
  const [posts, setPosts] = useState(filteredPosts);
  const [sortOption, setSortOption] = useState(''); // Track the current sort option

  // Update posts when filteredPosts changes
  useEffect(() => {
    setPosts(filteredPosts);
  }, [filteredPosts]);

  const sortPosts = (option) => {
    let sortedPosts = [...posts]; // Create a copy of the posts
    switch (option) {
      case 'newest':
        sortedPosts = displayNewestPosts(M, sortedPosts, null);
        break;
      case 'oldest':
        sortedPosts = displayOldestPosts(M, sortedPosts, null);
        break;
      case 'active':
        sortedPosts = displayActivePosts(M, sortedPosts, null);
        break;
      default:
        break;
    }
    setPosts(sortedPosts); // Update state with sorted posts
    setSortOption(option); // Update current sort option
  };

  return (
    <div className="search-results">
      <h3>{posts.length > 0 ? `Results for: "${searchQuery}"` : `No results found for: "${searchQuery}"`}</h3>
      <p>{posts.length} posts found</p>

      <div id="sort-options">
        <button onClick={() => sortPosts('newest')}>Newest</button>
        <button onClick={() => sortPosts('oldest')}>Oldest</button>
        <button onClick={() => sortPosts('active')}>Active</button>
      </div>

      {posts.length > 0 ? (
        <ul id="post-lists">
          {posts.map(post => (
            <li className="post-item" key={post.postID}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No matching posts found.</div>
      )}
    </div>
  );
}
