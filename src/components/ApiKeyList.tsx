import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chestLogo from '../assets/images/naked_chest_only.png';

function ApiKeyList() {
  const [apiKeys, setApiKeys] = useState<string[]>([]);

  useEffect(() => {
    const apiUrl = '/api/a7df2ae5-fe39-423a-b31d-bcd6c21cdc68/apikeys';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setApiKeys(data.data); // Assuming data.data is an array of key names
        } else {
          throw new Error('Invalid API response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching API keys:', error);
      });
  }, []);

  return (
    <div>
      <a href="/"><h1><img className='chest' src={chestLogo} alt="My Image" /> Key Names</h1></a>
      <ul>
        {apiKeys.map((keyName, index) => (
          <li key={index}>
            <Link to={`/api-key/${keyName}`}>{keyName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiKeyList;