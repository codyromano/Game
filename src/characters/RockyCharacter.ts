import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
// import { MomoAttacks } from "./MomoCharacter";

export default class RockyCharacter extends BaseCharacter {
  readonly name: string = "rocky";
  readonly imageOptimized: string = "/images/characters/rocky-optimized.png";
  readonly imageFull: string = "/images/characters/rocky-full-alpha.png";

  spawnProbability: number = 1;
  level = 15;

  isEligibleForTile(tile: TileType) {
    return tile === "rockyMarble";
  }

  receiveAttack(attackType: string, attacker: BaseCharacter) {
    super.modifyHealth(-5 * attacker.getLevel());

    return attacker.getLevel() < 10 ?  AttackEffectiness.WEAK : AttackEffectiness.MEDIUM;
  }

  getAttackTypes = () => ["Unleash the Minions", "Ground Stomp", "Thunderous Roar", "Sword Swing"];
}
