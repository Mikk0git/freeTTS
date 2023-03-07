import React, { useEffect, useState } from "react";
import axios from "axios";

export function AppProfilePage() {
  const getUserAudio = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/userAudio",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data.usersAudio);
      setAudioData(response.data.usersAudio);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAudio();
  }, []);

  const [audioData, setAudioData] = useState([]);

  const deleteAudioHandler = async (id) => {
    console.log("del");

    try {
      const response = await axios.post(
        "http://localhost:8080/deleteAudio",
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
      <h1 className="ml-5">Your audio</h1>

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
  return (
    <div className=" bg-gray-900 bg-opacity-40 border-0 border-gray-900 border-solid rounded-xl     ">
      <div className="audioGridItem m-4">
        <h2 className=" text-2xl mt-2 ">{langFlag(audio.lang)}</h2>
        <p className="  ">{audio.text}</p>
        <h4 className="font-bold ">{audio.date}</h4>
        <button
          type="submit"
          className="mb-2 font-bold "
          onClick={() => deleteAudioHandler(audio._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
