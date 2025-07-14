'use client'
import { useState } from 'react'
import './styles/global.css'

export default function Home() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    let personalizedResponse = ''

    if (!name || !subject) {
      personalizedResponse = "👋 Please enter both your name and your favorite subject to get started."
    } else {
      switch(subject.toLowerCase()) {
        case 'math':
          personalizedResponse = `🔢 Nice, ${name}! Math is like a puzzle. Let’s unlock some secrets together!`
          break
        case 'science':
          personalizedResponse = `🧪 Ooooh, science! ${name}, get ready for some experiments and discoveries.`
          break
        case 'reading':
        case 'language arts':
        case 'english':
          personalizedResponse = `📖 Reading time, ${name}? Let me grab my favorite book!`
          break
        case 'history':
          personalizedResponse = `📜 ${name}, let’s time travel through history together. Buckle up!`
          break
        default:
          personalizedResponse = `🌟 Awesome choice, ${name}! I’ll help you learn all about ${subject}.`
      }
    }

    setResponse(personalizedResponse)
  }

  return (
    <main>
      <h1>Welcome to Solyn!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's your name?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Favorite subject?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button type="submit">Start Learning</button>
      </form>
      {response && <p className="response">{response}</p>}
    </main>
  )
}