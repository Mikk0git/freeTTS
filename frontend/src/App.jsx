import { AppProfile } from "./components/AppProfile";
import { AppProfilePage } from "./components/AppProfilePage";
import { AppLogin } from "./components/AppLogin";
import { AppForm } from "./components/AppForm";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav className="App-navbar flex justify-between mt-2">
        <div className="logo ml-[calc(50vw-29px)]">
          <h1 className="font-bold  ">
            <a href="/">freeTTS</a>
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
            <div className="flex justify-center w-[70vw]  border-2  mt-[6rem] p-[3rem] ml-auto mr-auto sm:max-w-[500px]  ">
              <AppLogin />
            </div>
          }
        />
        <Route path="/profile" element={<AppProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
