import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubjectClick = (chosen) => {
    const options = ['Reading', 'Math', 'Science'];
    const selected = chosen === 'Surprise' 
      ? options[Math.floor(Math.random() * options.length)]
      : chosen;
    setSubject(selected);
    setFeedback('');
    setAnswer('');
  };

  const handleSubmitAnswer = () => {
    if (subject === 'Reading' && answer.toLowerCase() === 'book') {
      setFeedback('Correct! 📚');
    } else if (subject === 'Math' && answer === '4') {
      setFeedback('Nice job! ➕');
    } else if (subject === 'Science' && answer.toLowerCase() === 'water') {
      setFeedback('You got it! 💧');
    } else {
      setFeedback('Try again! 😅');
    }
  };

  return (
    <main style={{ backgroundColor: '#f0eaff', minHeight: '100vh', padding: '2rem', fontFamily: 'Segoe UI', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem' }}>Welcome to Solyn!</h1>

      {!submitted ? (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
            style={{ padding: '0.5rem', fontSize: '1rem', margin: '1rem' }}
          />
          <button
            onClick={() => setSubmitted(true)}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '5px' }}
          >
            Start
          </button>
        </>
      ) : (
        <>
          <h2>Hi {name}! 🌟 What do you want to learn?</h2>
          <div style={{ margin: '1rem 0' }}>
            {['Reading', 'Math', 'Science', 'Surprise'].map((s) => (
              <button
                key={s}
                onClick={() => handleSubjectClick(s)}
                style={{
                  margin: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#a48fff',
                  color: 'white',
                  border: 'none'
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {subject && (
            <div>
              <h3>{subject} Time!</h3>
              {subject === 'Reading' && <p>What do you call something you read for fun?</p>}
              {subject === 'Math' && <p>What’s 2 + 2?</p>}
              {subject === 'Science' && <p>What liquid do plants need to grow?</p>}

              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer"
                style={{ padding: '0.5rem', margin: '0.5rem', fontSize: '1rem' }}
              />
              <button
                onClick={handleSubmitAnswer}
                style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '5px' }}
              >
                Submit Answer
              </button>

              {feedback && <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>{feedback}</p>}
            </div>
          )}
        </>
      )}
    </main>
  );
}