import React from 'react';
import {
    displayNewestPosts,
    displayOldestPosts,
    displayActivePosts,
    getPostsByIDs
     } from '../components/helperFunctions'; 
import formatTimestamp from '../components/helperFunctions';// Import helper function
import { useState, useEffect } from 'react';

export default function CommunityPageView({ M, communityID, onSelectPost}) {
    // Fetch the community details using the communityID directly
    const community = M.data.communities.find(c => c.communityID === communityID);
    const composts = getPostsByIDs(M, community.postIDs);
    const [posts, setPosts] = useState(composts); // State for posts
    const [sortOption, setSortOption] = useState('newest'); // Default sort option
    
    
    useEffect(() => {
       if(community){
        setPosts(composts); // Set the posts specific to this community
        // Automatically sort posts by "newest" when the component first loads
        sortPosts('newest', composts);
       }
    }, [communityID, community]);
    const sortPosts = (option) => {
        let sortedPosts = [...posts]; // Create a copy of the posts
        switch (option) {
            case 'newest':
                sortedPosts = displayNewestPosts(M, sortedPosts, communityID); // You can pass the community ID if necessary
                break;
            case 'oldest':
                sortedPosts = displayOldestPosts(M, sortedPosts, communityID);
                break;
            case 'active':
                sortedPosts = displayActivePosts(M, sortedPosts, communityID);
                break;
            default:
                break;
        }
        setPosts(sortedPosts); // Update state with sorted posts
        setSortOption(option); // Update current sort option
    };
    return (
        
        <div id="community-page-view">
            <h2>{community.name}</h2>
            <p>{community.description}</p>
            <p>Created: {formatTimestamp(community.startDate)}</p>
            <p>Posts: {community.postIDs.length} | Members: {community.members.length}</p>
            <div id="sort-options">
                <button onClick={() => sortPosts('newest')}>Newest</button>
                <button onClick={() => sortPosts('oldest')}>Oldest</button>
                <button onClick={() => sortPosts('active')}>Active</button>
            </div>
        

            {/* Listing of posts */}
            <div id="post-lists">
            {posts.map((post) => (
                    <div key={post.id} className="post-item" onClick={() => onSelectPost(post.id)}>
                        <p className='post-meta'>{post.postedBy} | {formatTimestamp(new Date(post.postedDate))}</p>
                        <h3>{post.title}</h3>
                        <p>{post.content.slice(0,20)}...</p>
                        <p>Views: {post.views} | Comments: {post.commentIDs.length}</p>
                    </div>
                ))
                    
                } 
            </div>
        </div>
    );
}