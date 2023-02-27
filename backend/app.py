# -*- coding: utf-8 -*-
from gtts import gTTS
import sys

text = sys.argv[1]
language = sys.argv[2]

text = text.encode('utf-8', errors='ignore')

print(text)
print(language)
# utworzenie obiektu gTTS
tts = gTTS(text=text.decode('utf-8'), lang=language, slow=False)

# # zapisanie wyniku do pliku audio
tts.save("s.mp3")