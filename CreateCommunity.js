import React, { useState } from 'react';





const CreateCommunity = ({M,  onCommunityCreated }) => {
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    

    // Validate inputs
    const validateInputs = () => {
        const newErrors = {};
        
        if (!communityName) {
            newErrors.communityName = 'Community name is required';
        } else if (communityName.length > 100) {
            newErrors.communityName = 'Community name must be 100 characters or less';
        }

        if (!communityDescription) {
            newErrors.communityDescription = 'Community description is required';
        } else if (communityDescription.length > 500) {
            newErrors.communityDescription = 'Community description must be 500 characters or less';
        }

        if (!username) {
            newErrors.username = 'Username is required';
        }

        return newErrors;
    };

    // Handle form submission
    const Engender = (event) => {
        event.preventDefault(); // Prevent default form submission
        const validationErrors = validateInputs();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
           
            const newCommunity = {
                communityID: `community${M.data.communities.length + 1}`,
                name: communityName,
                description: communityDescription,
                postIDs: [],
                startDate: new Date(),
                members: [username],
                memberCount: 1,
            };
            console.log('Creating new community:', newCommunity);  // Debugging statement
            
            onCommunityCreated(newCommunity);
            
            // Clear the input fields
            setCommunityName('');
            setCommunityDescription('');
            setUsername('');
            
        }
    };

    return (
        <div className="new-community-form">
            <h2>Create a New Community</h2>
            <form onSubmit={Engender}>
                <div>
                    <label htmlFor="community-name">Community Name (required):</label>
                    <input
                        type="text"
                        id="community-name"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        required
                    />
                    {errors.communityName && <p className="error">{errors.communityName}</p>}
                </div>

                <div>
                    <label htmlFor="community-description">Community Description (required):</label>
                    <textarea
                        id="community-description"
                        value={communityDescription}
                        onChange={(e) => setCommunityDescription(e.target.value)}
                        required
                    />
                    {errors.communityDescription && <p className="error">{errors.communityDescription}</p>}
                </div>

                <div>
                    <label htmlFor="username">Username (required):</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <button type="submit">Engender Community</button>
            </form>
        </div>
    );
};

export default CreateCommunity;
