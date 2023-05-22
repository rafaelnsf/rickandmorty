import { Routes, Route } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";
import * as Pages from "./index"; // Importing all pages from Index.js
import './App.css';
import NavbarMenu from "./components/Menu/NavbarMenu";

function App() {
  return (
    <div className="App">
      <div>
        <NavbarMenu />
        <Routes>
          <Route exact path="/" element={<Pages.Home />} />
          <Route path="/characters" element={<Pages.CharactersList />} />
          <Route path="/locations" element={<Pages.LocationsList />} />
          <Route path="/episodes" element={<Pages.EpisodesList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
