import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  // Inicial state array
  const [repositories, setRepositories] = useState([]);

  // Check existing repositories and insert on state array
  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // Create a new repository and update state array
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repo #${Date.now()}`,
      url: 'http://www.com.br',
      techs: 'Node.js, ReactJS & React Native',
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  // Delete repository and update state array
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repository = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(repository);
  }

  // List existing repositories on state array
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
