import { useParams, useNavigate } from "react-router-dom";
import characters from "../characters";
// import PokemonDialogueBox from "./PokemonDialogBox";
import "./PokemonDialogueBox.css";

import Slide from "./Slide";
import BattleCard from "./BattleCard";
import { useContext, useEffect, useRef, useState } from "react";
import { momo } from "../characters/MomoCharacter";
import { AttackEffectiness } from "../characters/BaseCharacter";
import PokemonDialogueBox from "./PokemonDialogBox";
import { GameStateContext } from "../GameStateProvider";
// import BaseCharacter from "../characters/BaseCharacter";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

enum BattleStep {
  INTRO,
  ATTACK_OR_RUN,
  SELECT_ATTACK,
  AFTER_ATTACK_SUMMARY,
  DODGE_ATTACK,
}

type BattleState = {
  step: BattleStep;
  messages: string[];
};

const attackEffectinessLabels: {
  [key in AttackEffectiness]: string;
} = {
  [AttackEffectiness.MISS]: "Attack missed",
  [AttackEffectiness.MEDIUM]: `It's kinda effective`,
  [AttackEffectiness.STRONG]: `It's super effective!`,
  [AttackEffectiness.WEAK]: `It's barely effective`,
};

const DODGE_THRESHOLD = 1000 / 3;

const Battle = () => {
  const { x, y } = useParams();
  const navigate = useNavigate();
  const { state: game, updateState: updateGameState } =
    useContext(GameStateContext);

  const character = characters.find(
    // A recently defeated character can be found in the defeated map
    (c) => c.name === game.characterPositions[`${x},${y}`] || c.name === game.charactersDefeatedByPosition[`${x},${y}`]
  );

  if (character == null) {
    throw new Error(
      `I couldn't find a character at this map position. Whoops.`,
    );
  }
  const timeDodgePressedRef = useRef<null | number>(null);

  const [componentState, setComponentState] = useState<BattleState>({
    step: BattleStep.INTRO,
    messages: [`${character?.name} wants to fight`],
  });

  const animateBattle = async () => {
    await sleep(3000);

    const enemyLevel = character.getLevel();
    const momoLevel = momo.getLevel();

    let introMessage = "Ready to battle?";
    if (enemyLevel - momoLevel > 5) {
      introMessage = `⚠️ This enemy (Lvl ${enemyLevel}) is much stronger than you (Lvl ${momoLevel}).`;
    }

    setComponentState((state) => ({
      ...state,
      messages: [introMessage],
      step: BattleStep.ATTACK_OR_RUN,
    }))

    /*
    setComponentState((state) => ({
      ...state,
      messages: ["Choose an attack"],
      step: BattleStep.SELECT_ATTACK,
    }));
    */
  };

  useEffect(() => {
    switch (componentState.step) {
      case BattleStep.INTRO:
        animateBattle();
        break;
    }
  }, [componentState]);

  const onSelectAttack = async (attackName: string) => {
    setComponentState((state) => ({
      ...state,
      step: BattleStep.AFTER_ATTACK_SUMMARY,
      messages: [`Momo used ${attackName}`],
    }));
    await sleep(2000);
    const result = character.receiveAttack(attackName, momo);
    const resultLabel = attackEffectinessLabels[result];

    setComponentState((state) => ({
      ...state,
      messages: [resultLabel],
    }));

    await sleep(2000);

    // Continue the fight
    if (character.getHealth() > 0) {
      const nextAttack = character.getNextAttackType();

      setComponentState((state) => ({
        ...state,
        messages: [`${character.name} used ${nextAttack}`],
      }));

      await sleep(3000);

      setComponentState((state) => ({
        ...state,
        step: BattleStep.DODGE_ATTACK,
        messages: ["Get ready to dodge!"],
      }));

      await sleep(2000);
      setComponentState((state) => ({
        ...state,
        messages: ["3"],
      }));

      await sleep(1000);
      setComponentState((state) => ({
        ...state,
        messages: ["2"],
      }));

      await sleep(1000);
      setComponentState((state) => ({
        ...state,
        messages: ["1"],
      }));

      const currentTime = Date.now();

      await sleep(1000);

      const timeDodged = timeDodgePressedRef.current;
      const offsetTime = currentTime - (timeDodgePressedRef.current ?? 0);

      // Forgot to press the dodge button
      if (timeDodged === null) {
        setComponentState((state) => ({
          ...state,
          step: BattleStep.AFTER_ATTACK_SUMMARY,
          messages: [`You forgot to press Dodge!`],
        }));

        momo.receiveAttack(nextAttack, character);
      } else if (Math.abs(offsetTime) > DODGE_THRESHOLD) {
        const offsetLabel =
          offsetTime < 0 ? "Dodged too late!" : "Dodged too soon!";

        const displayOffset = Math.abs(offsetTime / 1000).toFixed(2);

        setComponentState((state) => ({
          ...state,
          step: BattleStep.AFTER_ATTACK_SUMMARY,
          messages: [`${offsetLabel} (off by ${displayOffset}s)`],
        }));

        momo.receiveAttack(nextAttack, character);
      } else {
        setComponentState((state) => ({
          ...state,
          step: BattleStep.AFTER_ATTACK_SUMMARY,
          messages: [`You dodged successfully!`],
        }));
      }

      timeDodgePressedRef.current = null;

      if (momo.getHealth() === 0) {
        navigate("/cutscene/fainted");
        return;
      }
      await sleep(3000);
      setComponentState((state) => ({
        ...state,
        step: BattleStep.SELECT_ATTACK,
        messages: ["Choose an attack"],
      }));
    } else {
      // Register victory
      updateGameState({
        ...game,
        charactersDefeatedByPosition: {
          ...game.charactersDefeatedByPosition,
          [`${x},${y}`]: character.name,
        },
      });
      // navigate("/cutscene/battle-win");
    }
  };

  useEffect(() => {
    // Navigate to cutscene after battle is won
    if (game.charactersDefeatedByPosition[`${x},${y}`]) {
      navigate("/cutscene/battle-win");
    }
  }, [game]);

  let dialogueOptions: string[] = [];

  switch (componentState.step) {
    case BattleStep.ATTACK_OR_RUN: 
      dialogueOptions = ['Attack', 'Run'];
    break;
    case BattleStep.SELECT_ATTACK:
      dialogueOptions = momo.getAttackTypes();
    break;
  }

  return (
    <main>
      <section
        className="primary-section"
        style={{
          alignContent: "center",
          width: "350px",
          margin: "25px auto",
        }}
      >
        <div
          className="center-content"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="character-image"
            style={{
              flex: 1,
              marginTop: "50px",
            }}
          >
            {componentState.step != BattleStep.INTRO && (
              <>
                <BattleCard health={momo.getHealth()} characterName={"Momo"} />
                <Slide direction="right">
                  <div
                    className="player-image"
                    style={{
                      backgroundImage: `url(/images/momo.png)`,
                    }}
                  />
                </Slide>
              </>
            )}

            {componentState.step == BattleStep.INTRO && (
              <Slide direction="left">
                <div
                  className="player-image"
                  style={{
                    backgroundImage: `url(/images/characters/joycie-full.png)`,
                  }}
                />
              </Slide>
            )}
          </div>

          <div
            className="character-image"
            style={{
              flex: 1,
            }}
          >
            {componentState.step != BattleStep.INTRO && (
              <BattleCard
                health={character.getHealth()}
                characterName={character?.name ?? "..."}
              />
            )}
            <Slide direction="right">
              <div
                className="player-image"
                style={{
                  backgroundImage: `url(${character?.imageFull})`,
                }}
              />
            </Slide>
          </div>
        </div>

        <div className="center-content">
          <PokemonDialogueBox
            onSelectOption={(option) => {
              switch (componentState.step) {
                case BattleStep.SELECT_ATTACK: 
                  onSelectAttack(option);
                break;
                case BattleStep.ATTACK_OR_RUN: {
                  if (option === 'Run') {
                    navigate("/cutscene/run");
                    return;
                  }
                  if (option === 'Attack') {
                    setComponentState((state) => ({
                      ...state,
                      messages: ["Choose an attack"],
                      step: BattleStep.SELECT_ATTACK,
                    }));
                  }
                break;
                }
              }
            }}
            messages={componentState.messages}
            options={dialogueOptions}
          />

          {componentState.step === BattleStep.DODGE_ATTACK &&
            timeDodgePressedRef.current === null && (
              <div className="center-content">
                <button
                  onClick={() => {
                    timeDodgePressedRef.current = Date.now();
                  }}
                  style={{
                    fontFamily: "PressStart",
                    border: "solid #000 3px",
                    borderRadius: "8px",
                    width: "200px",
                    padding: "10px",
                  }}
                >
                  Dodge
                </button>
              </div>
            )}
        </div>
      </section>
    </main>
  );
};

export default Battle;
