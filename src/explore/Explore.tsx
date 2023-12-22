import React, { useContext } from "react";
import GameFooter from "../GameFooter";

import MapContainer from "./MapContainer";

import "../styles.css";
import { GameStateContext } from "../GameStateProvider";

export default function Explore() {
  const { state: game } = useContext(GameStateContext);

  return (
    <main>
      <header>
        <div className="center-content">
          <h1>Momo&apos;s Adventure</h1>
        </div>
      </header>
      <section className="primary-section map-container">
        <MapContainer />
      </section>
      <GameFooter health={game.momo.health} energy={game.momo.energy} />
    </main>
  );
}
