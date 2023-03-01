import axios from "axios";

export function AppForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("textPrompt");
    const language = formData.get("language");
    const response = await axios.post(
      "http://localhost:8080/prompt",
      {
        text,
        language,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  };

  return (
    <section className="p-7 flex justify-center text-center">
      <form onSubmit={handleSubmit}>
        <textarea
          className="textPrompt text-black"
          name="textPrompt"
        ></textarea>

        {/* Language list */}
        <div id="langList" className=" justify-between ">
          <input
            type="radio"
            id="English"
            name="language"
            className="hiddena"
            value="en"
          ></input>
          <label htmlFor="English" className="m-4">
            {" "}
            🇺🇸{" "}
          </label>
          <input
            type="radio"
            id="Simplified Chinese"
            name="language"
            className="hiddena"
            value="zh"
          ></input>
          <label htmlFor="Simplified Chinese" className="m-4">
            {" "}
            🇨🇳{" "}
          </label>
          <input
            type="radio"
            id="Spanish"
            name="language"
            className="hiddena"
            value="es"
          ></input>
          <label htmlFor="Spanish" className="m-4">
            {" "}
            🇪🇸{" "}
          </label>
          <input
            type="radio"
            id="French"
            name="language"
            className="hiddena"
            value="fr"
          ></input>
          <label htmlFor="French" className="m-4">
            {" "}
            🇫🇷{" "}
          </label>
          <input
            type="radio"
            id="Arabic"
            name="language"
            className="hiddena"
            value="ar"
          ></input>
          <label htmlFor="Arabic" className="m-4">
            {" "}
            🇸🇦{" "}
          </label>
          <input
            type="radio"
            id="Ukrainian"
            name="language"
            className="hiddena"
            value="uk"
          ></input>
          <label htmlFor="Ukrainian" className="m-4">
            {" "}
            🇺🇦{" "}
          </label>
          <input
            type="radio"
            id="German"
            name="language"
            className="hiddena"
            value="de"
          ></input>
          <label htmlFor="German" className="m-4">
            {" "}
            🇩🇪{" "}
          </label>
          <input
            type="radio"
            id="Portuguese"
            name="language"
            className="hiddena"
            value="pt"
          ></input>
          <label htmlFor="Portuguese" className="m-4">
            {" "}
            🇵🇹{" "}
          </label>
          <input
            type="radio"
            id="Italian"
            name="language"
            className="hiddena"
            value="it"
          ></input>
          <label htmlFor="Italian" className="m-4">
            {" "}
            🇮🇹{" "}
          </label>
          <input
            type="radio"
            id="Turkish"
            name="language"
            className="hiddena"
            value="tr"
          ></input>
          <label htmlFor="Turkish" className="m-4">
            {" "}
            🇹🇷{" "}
          </label>
          <input
            type="radio"
            id="Japanese"
            name="language"
            className="hiddena"
            value="ja"
          ></input>
          <label htmlFor="Japanese" className="m-4">
            {" "}
            🇯🇵{" "}
          </label>
          <input
            type="radio"
            id="Korean"
            name="language"
            className="hiddena"
            value="ko"
          ></input>
          <label htmlFor="Korean" className="m-4">
            {" "}
            🇰🇷{" "}
          </label>
          <input
            type="radio"
            id="Dutch"
            name="language"
            className="hiddena"
            value="nl"
          ></input>
          <label htmlFor="Dutch" className="m-4">
            {" "}
            🇳🇱{" "}
          </label>
          <input
            type="radio"
            id="Polish"
            name="language"
            className="hiddena"
            value="pl"
          ></input>
          <label htmlFor="Polish" className="m-4">
            {" "}
            🇵🇱{" "}
          </label>
          <input
            type="radio"
            id="Indonesian"
            name="language"
            className="hiddena"
            value="id"
          ></input>
          <label htmlFor="Indonesian" className="m-4">
            {" "}
            🇮🇩{" "}
          </label>
        </div>
        <button type="submit" id="generateBtn"></button>
        <label htmlFor="generateBtn">
          <h2>Generate</h2>
        </label>
      </form>
    </section>
  );
}
