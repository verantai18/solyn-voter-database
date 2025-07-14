import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ backgroundColor: 'lavender', height: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem' }}>Welcome to Solyn!</h1>

      {!submitted ? (
        <>
          <p style={{ fontSize: '1.25rem' }}>What’s your name?</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
            style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px' }}
          />
          <button
            onClick={() => setSubmitted(true)}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              borderRadius: '5px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Start
          </button>
        </>
      ) : (
        <h2 style={{ marginTop: '2rem', fontSize: '2rem' }}>
          Nice to meet you, {name}! 🌟 Let’s learn together.
        </h2>
      )}
    </div>
  );
}