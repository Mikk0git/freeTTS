# -*- coding: utf-8 -*-
from gtts import gTTS
import sys
import os


# importing variables
text = sys.argv[1]
language = sys.argv[2]
userID = sys.argv[3]
audioID = sys.argv[4]

# encoding text
text = text.encode('utf-8', errors='ignore')

if not os.path.exists(f"audio/{userID}"):
    os.makedirs(f"audio/{userID}")
    print("Created", userID)
else:
    print("Folder", userID, "already exists")



print(text)
print(language)

# generating TTS
tts = gTTS(text=text.decode('utf-8'), lang=language, slow=False)

# saving audio files
tts.save(f"audio/{userID}/{audioID}.mp3")