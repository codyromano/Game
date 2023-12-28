import { TileType } from "../explore/tiles";
import { GameState } from "../GameStateProvider";
import { Serializable } from "../utils/Serializable";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";

// TODO: Add tiles that momo can traverse as needed
const eligibleTiles = new Set(["wall", "grass", "water"] as TileType[]);

export enum MomoAttacks {
  BARK = "Bark",
  GROWL = "Growl",
  TWIRL_BOWTIE = "Twirl Bowtie",
}

export default class MomoCharacter
  extends BaseCharacter
  implements Serializable<MomoCharacter>
{
  readonly characterName: string = "momo";
  protected energy: number = 100;

  // TODO: Replace with optimized image
  readonly imageOptimized: string = "/images/momo.png";
  readonly imageFull: string = "/images/momo.png";

  isEligibleForTile(tile: TileType) {
    return eligibleTiles.has(tile);
  }
  getAttackTypes = () => [
    MomoAttacks.BARK,
    MomoAttacks.GROWL,
    MomoAttacks.TWIRL_BOWTIE,
  ];

  modifyEnergy(amount: number) {
    this.energy = Math.max(0, Math.min(100, this.energy + amount));
  }

  // eslint-disable-next-line
  receiveAttack(_attackType: string, attacker: BaseCharacter) {
    // Do 10pts of damage per level of the attacker
    super.modifyHealth(-Math.max(attacker.getLevel() * 10));

    // TODO: Maybe return strong in some cases (like the boss battle)
    return attacker.getLevel() === 1
      ? AttackEffectiness.WEAK
      : AttackEffectiness.MEDIUM;
  }

  serialize(state: GameState): Partial<GameState> {
    return {
      ...state,
      momo: {
        ...state.momo,
        health: this.health,
        energy: this.energy,
      },
    };
  }

  deserialize(state: GameState): MomoCharacter {
    this.health = state.momo.health;
    this.energy = state.momo.energy;
    return this;
  }
}

export const momo = new MomoCharacter();
