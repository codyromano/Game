import React from "react";
import ReactDOM from "react-dom/client";
import Explore from "./explore/Explore";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Battle from "./battle/Battle";

import "./styles.css";
import CutScene from "./cutscene/CutScene";
import { GameStateProvider } from "./GameStateProvider";
import StoryView from "./story/StoryView";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GameStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/battle/:x/:y" element={<Battle />} />
          <Route path="/cutscene/:sceneId" element={<CutScene />} />
          <Route path="/story" element={<StoryView />} />
        </Routes>
      </Router>
    </GameStateProvider>
  </React.StrictMode>,
);
