import { useState } from 'react';
import '../styles/globals.css';

export default function Home() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleSubjectSelect = (chosenSubject) => {
    setSubject(chosenSubject);
    setResponse(`Hi ${name || 'friend'}! Let's explore ${chosenSubject} together. 🌟`);
  };

  return (
    <main>
      <h1>Welcome to Solyn!</h1>

      {!submitted ? (
        <>
          <p>What's your name?</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <button onClick={handleSubmit}>Start</button>
        </>
      ) : (
        <>
          <h2>Nice to meet you, {name || 'friend'}! 🎉</h2>
          <p>What do you want to learn about today?</p>
          <div className="subject-buttons">
            <button onClick={() => handleSubjectSelect('space')}>Space</button>
            <button onClick={() => handleSubjectSelect('animals')}>Animals</button>
            <button onClick={() => handleSubjectSelect('weather')}>Weather</button>
          </div>
          {response && <p className="response">{response}</p>}
        </>
      )}
    </main>
  );
}
