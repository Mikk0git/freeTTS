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
            className="hiddena langInput"
            value="en"
          ></input>
          <label htmlFor="English" className="lang  m-4">
            {" "}
            🇺🇸{" "}
          </label>
          <input
            type="radio"
            id="Simplified Chinese"
            name="language"
            className="hiddena langInput"
            value="zh"
          ></input>
          <label htmlFor="Simplified Chinese" className="lang  m-4">
            {" "}
            🇨🇳{" "}
          </label>
          <input
            type="radio"
            id="Spanish"
            name="language"
            className="hiddena langInput"
            value="es"
          ></input>
          <label htmlFor="Spanish" className="lang  m-4">
            {" "}
            🇪🇸{" "}
          </label>
          <input
            type="radio"
            id="French"
            name="language"
            className="hiddena langInput"
            value="fr"
          ></input>
          <label htmlFor="French" className="lang  m-4">
            {" "}
            🇫🇷{" "}
          </label>
          <input
            type="radio"
            id="Arabic"
            name="language"
            className="hiddena langInput"
            value="ar"
          ></input>
          <label htmlFor="Arabic" className="lang  m-4">
            {" "}
            🇸🇦{" "}
          </label>
          <input
            type="radio"
            id="Ukrainian"
            name="language"
            className="hiddena langInput"
            value="uk"
          ></input>
          <label htmlFor="Ukrainian" className="lang  m-4">
            {" "}
            🇺🇦{" "}
          </label>
          <input
            type="radio"
            id="German"
            name="language"
            className="hiddena langInput"
            value="de"
          ></input>
          <label htmlFor="German" className="lang  m-4">
            {" "}
            🇩🇪{" "}
          </label>
          <input
            type="radio"
            id="Portuguese"
            name="language"
            className="hiddena langInput"
            value="pt"
          ></input>
          <label htmlFor="Portuguese" className="lang  m-4">
            {" "}
            🇵🇹{" "}
          </label>
          <input
            type="radio"
            id="Italian"
            name="language"
            className="hiddena langInput"
            value="it"
          ></input>
          <label htmlFor="Italian" className="lang  m-4">
            {" "}
            🇮🇹{" "}
          </label>
          <input
            type="radio"
            id="Turkish"
            name="language"
            className="hiddena langInput"
            value="tr"
          ></input>
          <label htmlFor="Turkish" className="lang  m-4">
            {" "}
            🇹🇷{" "}
          </label>
          <input
            type="radio"
            id="Japanese"
            name="language"
            className="hiddena langInput"
            value="ja"
          ></input>
          <label htmlFor="Japanese" className="lang  m-4">
            {" "}
            🇯🇵{" "}
          </label>
          <input
            type="radio"
            id="Korean"
            name="language"
            className="hiddena langInput"
            value="ko"
          ></input>
          <label htmlFor="Korean" className="lang  m-4">
            {" "}
            🇰🇷{" "}
          </label>
          <input
            type="radio"
            id="Dutch"
            name="language"
            className="hiddena langInput"
            value="nl"
          ></input>
          <label htmlFor="Dutch" className="lang  m-4">
            {" "}
            🇳🇱{" "}
          </label>
          <input
            type="radio"
            id="Polish"
            name="language"
            className="hiddena langInput"
            value="pl"
          ></input>
          <label htmlFor="Polish" className="lang  m-4">
            {" "}
            🇵🇱{" "}
          </label>
          <input
            type="radio"
            id="Indonesian"
            name="language"
            className="hiddena langInput"
            value="id"
          ></input>
          <label htmlFor="Indonesian" className="lang  m-4">
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
