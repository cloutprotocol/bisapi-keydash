import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import chestLogo from '../assets/images/naked_chest_only.png';

function ApiKeyList() {
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const location = useLocation();

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
          setApiKeys(data.data);
        } else {
          throw new Error('Invalid API response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching API keys:', error);
      });
  }, []);

  const isActive = (path: string): boolean => {
    return decodeURIComponent(location.pathname) === path;
  };

  return (
    <div>
      <div className='titlebar'>
        <a href="/"><h1><img className='chest' src={chestLogo} alt="chest" />[Key Names]</h1></a>
      </div>
      <ul>
        {apiKeys.map((keyName, index) => (
          <li key={index}>
            <Link
              to={`/api-key/${encodeURIComponent(keyName)}`}
              className={isActive(`/api-key/${keyName}`) ? 'active' : ''}
            >
              {keyName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiKeyList;