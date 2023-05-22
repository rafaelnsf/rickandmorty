import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

//Importing all individual pages
import Home from "./pages/Home";
import CharactersList from "./pages/CharactersList";
import LocationsList from "./pages/LocationsList";
import EpisodesList from "./pages/EpisodesList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>,
  </React.StrictMode>
);

//Exporting all pages so they can be used on app.js
export {
  Home,
  CharactersList,
  LocationsList,
  EpisodesList
};

