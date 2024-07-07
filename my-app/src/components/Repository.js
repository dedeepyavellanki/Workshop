import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repository = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h2>Repository</h2>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repository;
