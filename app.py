from gtts import gTTS

# tekst do przekształcenia na mowę
text = "Witaj świecie!"

# wybór języka
language = 'pl'

# utworzenie obiektu gTTS
tts = gTTS(text=text, lang=language, slow=False)

# zapisanie wyniku do pliku audio
tts.save("s.mp3")