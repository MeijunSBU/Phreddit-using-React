

export default function formatTimestamp(timestamp)
{
  const date = new Date(timestamp);
  const now = Date.now();
  const difference = now - date.getTime();

  //convert milliseconds to seconds
  const seconds = Math.floor(difference/1000);
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds/60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes/60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours/24);
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days/30);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months/12);
  return `${years} years ago`;
}

// Helper function to get posts by IDs
export function getPostsByIDs(M,postIDs) {
    return postIDs.map(id => M.data.posts.find(post => post.postID === id)).filter(Boolean);
}

// Helper function to get comments by IDs
function getCommentsByIDs(M,commentIDs) {
    return commentIDs.map(id => M.data.comments.find(comment => comment.commentID === id)).filter(Boolean);
}

// Sort posts by newest first
export function displayNewestPosts(M, posts, currentCommunityID) {
    if (currentCommunityID === null) {
        return posts.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } 
    else {
        const community = M.data.communities.find(community => community.communityID === currentCommunityID);
        const communityPosts = getPostsByIDs(M, community.postIDs);
        return communityPosts.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
}

// Sort posts by oldest first
export function displayOldestPosts(M, posts, currentCommunityID) {
    if (currentCommunityID === null) {
        return posts.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    } 
    else {
        const community = M.data.communities.find(community => community.communityID === currentCommunityID);
        const communityPosts = getPostsByIDs(M, community.postIDs);
        return communityPosts.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    }
}
  // Sort posts by the most recent comments from the 'most active'
export function displayActivePosts(M, posts, currentCommunityID) {
    // Helper function to find the most recent comment date from a post's comments
    function getMostRecentCommentDate(post) {
        const comments = getCommentsByIDs(M, post.commentIDs);
        return comments.reduce((latest, comment) => {
            return new Date(comment.commentedDate) > latest ? new Date(comment.commentedDate) : latest;
        }, new Date(0)); // Default to earliest date
    }

    if (currentCommunityID === null) {
        return posts.sort((a, b) => getMostRecentCommentDate(b) - getMostRecentCommentDate(a));
    } 
    else {
        const community = M.data.communities.find(community => community.communityID === currentCommunityID);
        const communityPosts = getPostsByIDs(M, community.postIDs);
        return communityPosts.sort((a, b) => getMostRecentCommentDate(b) - getMostRecentCommentDate(a));
    }
  }
  