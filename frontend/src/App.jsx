import { AppProfile } from "./components/AppProfile";
import { AppLogin } from "./components/AppLogin";
import { AppForm } from "./components/AppForm";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="App-navbar">
        <h1 className="text-center font-bold ">
          <Link to={"/"}>freeTTS</Link>
        </h1>
        <AppProfile />
      </nav>

      <Routes>
        <Route path="/" element={<AppForm />} />
        <Route path="/login" element={<AppLogin />} />
      </Routes>
    </div>
  );
}

export default App;
