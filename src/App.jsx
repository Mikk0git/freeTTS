import { useState } from 'react'
import './App.css'

function App() {


  return (
    <div className="App">
      <nav className="App-navbar">
        <h1 className='text-center font-bold '>freeTTS</h1>
      </nav>
      <section className='p-7 flex justify-center text-center'>
        <form method="POST" action="/form-submit">          <textarea className='textPrompt text-black' name='textPrompt'></textarea>
          <button type="submit" id='generateBtn'></button>
          <label htmlFor="generateBtn"><h2>Generate</h2></label>
        </form>
      </section>
      
      
    </div>
  )
}

export default App
