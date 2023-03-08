import React, { useEffect, useState } from "react";
import axios from "axios";

export function AppProfilePage() {
  const [audioData, setAudioData] = useState([]);

  const getUserAudio = async () => {
    try {
      const response = await axios.post(
        "https://freetts-api.onrender.com:8080/userAudio",
        {},
        {
          withCredentials: true,
        }
      );
      setAudioData(response.data.usersAudio);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAudio();
  }, []);

  const deleteAudioHandler = async (id) => {
    console.log("del");

    try {
      const response = await axios.post(
        "https://freetts-api.onrender.com:8080/deleteAudio",
        {
          id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("deleted " + response.data.deletedAudio);
        const deletedAudio = response.data.deletedAudio;
        const newAudioData = audioData.filter(
          (audio) => audio._id !== deletedAudio._id
        );
        setAudioData(newAudioData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="appProfilePage">
      <h1 className="ml-7 text-xl">Your audio</h1>

      <div id="audioGrid" className=" m-6">
        {audioData
          .slice(0)
          .reverse()
          .map((audio) => (
            <AudioGridItem
              key={audio.date}
              audio={audio}
              deleteAudioHandler={deleteAudioHandler}
            />
          ))}
      </div>
    </section>
  );
}

function AudioGridItem({ audio, deleteAudioHandler }) {
  const [audioSrc, setAudioSrc] = useState(null);

  const loadAudioHandler = async (id) => {
    try {
      const response = await axios.post(
        "https://freetts-api.onrender.com:8080/loadAudio",
        {
          id,
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
      setAudioSrc(URL.createObjectURL(blob));
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const langFlag = (audioLang) => {
    switch (audioLang) {
      case "en":
        return "🇺🇸";
      case "it":
        return "🇮🇹";
      case "cs":
        return "🇨🇿";
      case "pt":
        return "🇵🇹";
      case "zh":
        return "🇨🇳";
      case "es":
        return "🇪🇸";
      case "fr":
        return "🇫🇷";
      case "ar":
        return "🇸🇦";
      case "uk":
        return "🇺🇦";
      case "de":
        return "🇩🇪";
      case "tr":
        return "🇹🇷";
      case "ja":
        return "🇯🇵";
      case "ko":
        return "🇰🇷";
      case "nl":
        return "🇳🇱";
      case "pl":
        return "🇵🇱";
      case "id":
        return "🇮🇩";
      default:
        return "lang";
    }
  };

  const dateFormatter = (audioDate) => {
    const audioYear = audioDate.slice(0, 10);
    const audioHour = audioDate.slice(11, 19);
    return audioHour + " " + audioYear;
  };

  return (
    <div className=" bg-gray-900 bg-opacity-40 border-0 border-gray-900 border-solid rounded-xl     ">
      <div className="audioGridItem m-4">
        <h2 className=" text-2xl mt-2 ">{langFlag(audio.lang)}</h2>
        <p className="text-lg">{audio.text}</p>
        <h4 className="font-bold text-xs ">{dateFormatter(audio.date)}</h4>
        <button
          className="mb-2 font-bold hover:text-red-700"
          onClick={() => deleteAudioHandler(audio._id)}
        >
          Delete
        </button>
        <button
          className="mb-2 ml-2 font-bold hover:text-gray-700"
          onClick={() => loadAudioHandler(audio._id)}
        >
          Load file
        </button>
        {audioSrc && (
          <div className="flex justify-start items-center">
            <audio controls className="mb-1 mr-2" src={audioSrc} />
            <a href={audioSrc} download>
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
