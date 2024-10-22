import React, { useState } from 'react';

export default function Phreddit({ M, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const query = searchQuery.trim().toLowerCase();
      const searchTerms = query.split(/\s+/);

      const filteredPosts = M.data.posts.filter(post => {
        const postTitle = post.title.toLowerCase();
        const postContent = post.content.toLowerCase();

        const postMatches = searchTerms.some(term => 
          postTitle.includes(term) || postContent.includes(term)
        );

        const commentMatches = M.data.comments.some(comment => 
          post.commentIDs.includes(comment.commentID) && 
          searchTerms.some(term => comment.content.toLowerCase().includes(term))
        );

        return postMatches || commentMatches;
      });

      // Navigate to the search results page with the filtered posts and the search query
      onNavigate('search', { filteredPosts, query });
    }
  };

  return (
    <div className="banner">
      <a href="#" className="name" onClick={() => onNavigate('home')}>phreddit</a>
      <input
        type="text"
        className="searchbox"
        placeholder="Search Phreddit..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
      <button className="postbutton" onClick={() => onNavigate('create-post')}>Create Post</button>
    </div>
  );
}
