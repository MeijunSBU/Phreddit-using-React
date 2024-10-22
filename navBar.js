

export default function NavBar({ M, onNavigate, currentView, setCommunityID })
{
    const handleCommunityClick = (id) => 
    {
        setCommunityID(id);
        onNavigate('community');
    };

    const isHome = currentView === 'home';

    return (
        <div className='navbar'>
            <div className={`home-link ${isHome ? 'active' : ''}`} onClick={() => onNavigate('home')}>Home</div>
            <hr className='delimiter' />
            <h2 className='community-title'>Communities</h2>
            <button id="community-button" className={currentView === 'create-community' ? 'active' : ''}
        onClick={() => onNavigate('createCommunity')}
      >
        Create Community
      </button>
            {/* List of communities */}
            <ul className="community-list">
                {M.data.communities.map((community) => (
                    <li key={community.communityID}>
                    <button 
                        className="community-link" 
                        onClick={() => handleCommunityClick(community.communityID)}
                    >{community.name}
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}