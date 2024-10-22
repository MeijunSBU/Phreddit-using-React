// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
// import './stylesheets/App.css';
import './css/index.css';
import Phreddit from './components/phreddit.js';
import NavBar from './components/navBar.js';
import HomePage from './components/homePage.js';
import CommunityPageView from './components/CommunityPageView.js';
import CreateCommunity from './components/CreateCommunity.js';
import { useState } from 'react';
import Model from './models/model.js';
import { SearchResults } from './components/search.js';

const M = new Model();

function App() {
  const [currentView, setCurrentView] = useState('home'); // Track the current view
  const[selectedCommunity, setSelectedCommunity] = useState(null); // Track the selected community
  const [selectedPostID, setSelectedPostID] = useState(null);
  const [communities, setCommunities] = useState(M.data.communities);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const NewCommunityCreated = (newCommunity) => {
    M.data.communities.push(newCommunity);
    setCommunities(M.data.communities);  // Update React state
    setCurrentView('community'); // Navigate to the community view
    setSelectedCommunity(newCommunity.communityID); // Set the selected community ID
};

const handleNavigate = (view, data) => {
  setCurrentView(view);

  if (view === 'search') {
    setFilteredPosts(data.filteredPosts);
    setSearchQuery(data.query);
  }
};


  const renderView = () => 
  {
    switch (currentView)
    {
      case 'home':
        return <HomePage M={M} onNavigate={setSelectedPostID} />;
      
      case 'community':
        return <CommunityPageView M={M} communityID={selectedCommunity} onNavigate={setSelectedPostID}/>; // Render the CommunityPageView  
      
      case 'createCommunity': // New case for the create community view
        return <CreateCommunity M={M} onCommunityCreated={NewCommunityCreated} />;
 
      case 'search':
        return <SearchResults filteredPosts={filteredPosts} searchQuery={searchQuery}  M = {M}/>;
      default:
        return <HomePage M={M} onNavigate={setSelectedPostID} />;
    }
  }

  return (
    <section className="phreddit">
      <Phreddit M={M} onNavigate={handleNavigate} />
      <div className='container'>
        <NavBar M={M} onNavigate={setCurrentView} setCommunityID={setSelectedCommunity} currentView={currentView}/>
        <div className='main'>{renderView()}</div>
      </div>
    </section>
  );
}

export default App;