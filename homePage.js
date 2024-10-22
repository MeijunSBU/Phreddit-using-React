
import formatTimestamp from './helperFunctions.js';
import { displayNewestPosts, displayOldestPosts, displayActivePosts } from '../components/helperFunctions';
import { useState, useEffect } from 'react';



export default function HomePage({M,  setSelectedPostID })
{
    const [posts, setPosts] = useState(M.data.posts); // State for posts
    const [sortOption, setSortOption] = useState('newest'); // Default sort option
    useEffect(() => {
        // When the component mounts or when M.data.posts changes
        setPosts(M.data.posts);
    }, [M.data.posts]);
    const sortPosts = (option) => {
        let sortedPosts = [...posts]; // Create a copy of the posts
        switch (option) {
            case 'newest':
                sortedPosts = displayNewestPosts(M, sortedPosts, null); // You can pass the community ID if necessary
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
    return(
        <div id="post-controls">
            <div className="post-header-container">
                <h2 id="post-header">
                    All Posts
                </h2>
                <div id="sort-options">
                <button onClick={() => sortPosts('newest')}>Newest</button>
                <button onClick={() => sortPosts('oldest')}>Oldest</button>
                <button onClick={() => sortPosts('active')}>Active</button>
                </div>
            </div>
            
            <div id="post-lists">
                {posts.map((post) => (
                    <div key={post.postID} className="post-item" onClick={() => setSelectedPostID(post.postID)}>
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