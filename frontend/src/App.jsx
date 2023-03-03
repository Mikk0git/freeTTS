import { AppProfile } from "./components/AppProfile";
import { AppLogin } from "./components/AppLogin";
import { AppForm } from "./components/AppForm";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="App-navbar flex justify-between mt-2">
        <div className="logo">
          <h1 className="font-bold  ">
            <Link to={"/"}>freeTTS</Link>
          </h1>
        </div>
        <div className=" mr-6">
          <AppProfile />
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<AppForm />} />

        <Route
          path="/login"
          element={
            <div className="flex justify-center mt-24 mr-14 ml-14  border-2">
              <AppLogin />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
