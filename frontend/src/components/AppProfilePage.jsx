import React, { useEffect, useState } from "react";
import axios from "axios";

export function AppProfilePage() {
  const [audioData, setAudioData] = useState([]);
  const getUserAudio = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/UserAudio",
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
  return (
    <section className="appProfilePage">
      <h1>Your audio</h1>
      <form onSubmit={getUserAudio}>
        <button type="submit">refresh</button>
      </form>
      <div id="audioGrid" className="flex ml-4">
        <AudioGridItem audioData={audioData} />
      </div>
    </section>
  );
}
function AudioGridItem({ audioData }) {
  const deleteAudio = async (event, id) => {
    event.preventDefault();
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
        console.log("deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {audioData
        .slice(0)
        .reverse()
        .map((audio) => (
          <div key={audio.date} className="audioGridItem m-4">
            <h2>Language: {audio.lang}</h2>
            <p>{audio.text}</p>
            <h4>{audio.date}</h4>
            <form onSubmit={deleteAudio}>
              <button type="submit">Delete</button>
            </form>
          </div>
        ))}
    </div>
  );
}
