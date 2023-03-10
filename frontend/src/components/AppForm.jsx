import React, { useState } from "react";
import axios from "axios";

export function AppForm() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("textPrompt");
    const language = formData.get("language");

    if (text != "" && language != null) {
      console.log(text);
      setGenerating(true);
    }

    const response = await axios.post(
      "http://localhost:8080/prompt",
      {
        text,
        language,
      },
      {
        withCredentials: true,
        headers: {
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([response.data], { type: "audio/mpeg" });
    setGenerating(false);
    setAudioSrc(URL.createObjectURL(blob));
  };

  return (
    <div className="appForm ">
      <section className="p-7 flex justify-center text-center">
        <form onSubmit={handleSubmit}>
          <textarea
            className="textPrompt text-black w-[70vw] h-[40vh] border-black border-[3px] "
            name="textPrompt"
          ></textarea>

          {/* Language list */}
          <div id="langList" className=" justify-between w-[70vw] text-2xl ">
            <input
              type="radio"
              id="English"
              name="language"
              className="langInput"
              value="en"
            ></input>
            <label htmlFor="English" className="lang  m-4">
              {" "}
              πΊπΈ{" "}
            </label>
            <input
              type="radio"
              id="Simplified Chinese"
              name="language"
              className="langInput"
              value="zh"
            ></input>
            <label htmlFor="Simplified Chinese" className="lang  m-4">
              {" "}
              π¨π³{" "}
            </label>
            <input
              type="radio"
              id="Spanish"
              name="language"
              className="langInput"
              value="es"
            ></input>
            <label htmlFor="Spanish" className="lang  m-4">
              {" "}
              πͺπΈ{" "}
            </label>
            <input
              type="radio"
              id="French"
              name="language"
              className="langInput"
              value="fr"
            ></input>
            <label htmlFor="French" className="lang  m-4">
              {" "}
              π«π·{" "}
            </label>
            <input
              type="radio"
              id="Arabic"
              name="language"
              className="langInput"
              value="ar"
            ></input>
            <label htmlFor="Arabic" className="lang  m-4">
              {" "}
              πΈπ¦{" "}
            </label>
            <input
              type="radio"
              id="Ukrainian"
              name="language"
              className="langInput"
              value="uk"
            ></input>
            <label htmlFor="Ukrainian" className="lang  m-4">
              {" "}
              πΊπ¦{" "}
            </label>
            <input
              type="radio"
              id="German"
              name="language"
              className="langInput"
              value="de"
            ></input>
            <label htmlFor="German" className="lang  m-4">
              {" "}
              π©πͺ{" "}
            </label>
            <input
              type="radio"
              id="Portuguese"
              name="language"
              className="langInput"
              value="pt"
            ></input>
            <label htmlFor="Portuguese" className="lang  m-4">
              {" "}
              π΅πΉ{" "}
            </label>
            <input
              type="radio"
              id="Czech"
              name="language"
              className="langInput"
              value="cs"
            ></input>
            <label htmlFor="Czech" className="lang  m-4">
              {" "}
              π¨πΏ{" "}
            </label>
            <input
              type="radio"
              id="Italian"
              name="language"
              className="langInput"
              value="it"
            ></input>
            <label htmlFor="Italian" className="lang  m-4">
              {" "}
              π?πΉ{" "}
            </label>
            <input
              type="radio"
              id="Turkish"
              name="language"
              className="langInput"
              value="tr"
            ></input>
            <label htmlFor="Turkish" className="lang  m-4">
              {" "}
              πΉπ·{" "}
            </label>
            <input
              type="radio"
              id="Japanese"
              name="language"
              className="langInput"
              value="ja"
            ></input>
            <label htmlFor="Japanese" className="lang  m-4">
              {" "}
              π―π΅{" "}
            </label>
            <input
              type="radio"
              id="Korean"
              name="language"
              className="langInput"
              value="ko"
            ></input>
            <label htmlFor="Korean" className="lang  m-4">
              {" "}
              π°π·{" "}
            </label>
            <input
              type="radio"
              id="Dutch"
              name="language"
              className="langInput"
              value="nl"
            ></input>
            <label htmlFor="Dutch" className="lang  m-4">
              {" "}
              π³π±{" "}
            </label>
            <input
              type="radio"
              id="Polish"
              name="language"
              className="langInput"
              value="pl"
            ></input>
            <label htmlFor="Polish" className="lang  m-4">
              {" "}
              π΅π±{" "}
            </label>
            <input
              type="radio"
              id="Indonesian"
              name="language"
              className="langInput"
              value="id"
            ></input>
            <label htmlFor="Indonesian" className="lang  m-4">
              {" "}
              π?π©{" "}
            </label>
          </div>
          <button type="submit" id="generateBtn" className=" "></button>
          <label htmlFor="generateBtn">
            <h2 className="">Generate</h2>
          </label>
        </form>
      </section>
      <AudioPlayer audioSrc={audioSrc} generating={generating} />
    </div>
  );
}

function AudioPlayer({ audioSrc, generating }) {
  return (
    <div className="audioFile flex justify-center text-center ">
      {generating ? (
        <h2>Loading...</h2>
      ) : (
        audioSrc && (
          <div>
            <audio controls className="mb-1" src={audioSrc} />
            <a href={audioSrc} download>
              Download
            </a>
          </div>
        )
      )}
    </div>
  );
}
