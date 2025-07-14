import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <h1>Welcome to Solyn!</h1>

      {!submitted ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '5px',
              marginBottom: '1rem'
            }}
          />
          <br />
          <button
            onClick={() => setSubmitted(true)}
            style={{
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              margin: '0.5rem',
              borderRadius: '5px',
              backgroundColor: '#8a2be2',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Start!
          </button>
        </>
      ) : (
        <p>
          Nice to meet you, <strong>{name || 'friend'}</strong>! 🌟 Let’s learn together.
        </p>
      )}
    </main>
  );
}