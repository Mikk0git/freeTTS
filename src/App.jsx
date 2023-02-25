import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <nav className="App-navbar">
        <h1 className='text-center font-bold '>freeTTS</h1>
      </nav>
      <AppForm />
    </div>
  )
}

export default App



function AppForm() {
  const handleSubmit = (event) => {
    event.preventDefault(); // unikamy domyślnego zachowania przeglądarki po wysłaniu formularza
    const textPromptValue = event.target.textPrompt.value; // odczytujemy wartość pola tekstowego
    const langValue = event.target.language.value;
    console.log(textPromptValue); // wyświetlamy wartość w konsoli
    console.log(langValue); // wyświetlamy wartość w konsoli

    
  }

  return (
    <section className='p-7 flex justify-center text-center'>
      <form onSubmit={handleSubmit}>
        <textarea className='textPrompt text-black' name='textPrompt'></textarea>

        {/* Language list */}
         <div id='langList' className=' justify-between '>
<input type="radio" id="English" name="language" className='hiddena' value="en"></input>
<label for="English" className='m-4'> 🇺🇸 </label>
<input type="radio" id="Simplified Chinese" name="language" className='hiddena' value="zh"></input>
<label for="Simplified Chinese" className='m-4'> 🇨🇳 </label>
<input type="radio" id="Spanish" name="language" className='hiddena' value="es"></input>
<label for="Spanish" className='m-4'> 🇪🇸 </label>
<input type="radio" id="French" name="language" className='hiddena' value="fr"></input>
<label for="French" className='m-4'> 🇫🇷 </label>
<input type="radio" id="Arabic" name="language" className='hiddena' value="ar"></input>
<label for="Arabic" className='m-4'> 🇸🇦 </label>
<input type="radio" id="Ukrainian" name="language" className='hiddena' value="uk"></input>
<label for="Ukrainian" className='m-4'> 🇺🇦 </label>
<input type="radio" id="German" name="language" className='hiddena' value="de"></input>
<label for="German" className='m-4'> 🇩🇪 </label>
<input type="radio" id="Portuguese" name="language" className='hiddena' value="pt"></input>
<label for="Portuguese" className='m-4'> 🇵🇹 </label>
<input type="radio" id="Italian" name="language" className='hiddena' value="it"></input>
<label for="Italian" className='m-4'> 🇮🇹 </label>
<input type="radio" id="Turkish" name="language" className='hiddena' value="tr"></input>
<label for="Turkish" className='m-4'> 🇹🇷 </label>
<input type="radio" id="Japanese" name="language" className='hiddena' value="ja"></input>
<label for="Japanese" className='m-4'> 🇯🇵 </label>
<input type="radio" id="Korean" name="language" className='hiddena' value="ko"></input>
<label for="Korean" className='m-4'> 🇰🇷 </label>
<input type="radio" id="Dutch" name="language" className='hiddena' value="nl"></input>
<label for="Dutch" className='m-4'> 🇳🇱 </label>
<input type="radio" id="Polish" name="language" className='hiddena' value="pl"></input>
<label for="Polish" className='m-4'> 🇵🇱 </label>
<input type="radio" id="Indonesian" name="language" className='hiddena' value="id"></input>
<label for="Indonesian" className='m-4'> 🇮🇩 </label>
          </div>
        <button type="submit" id='generateBtn'></button>
        <label htmlFor="generateBtn"><h2>Generate</h2></label>
      </form>
    </section>
  );
}
