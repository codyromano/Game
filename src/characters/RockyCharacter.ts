import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
// import { MomoAttacks } from "./MomoCharacter";

const spawnPositions: Set<string> = new Set(['35,4']);

export default class RockyCharacter extends BaseCharacter {
  readonly characterName: string = "rocky";
  readonly imageOptimized: string = "/images/characters/rocky-optimized.png";
  readonly imageFull: string = "/images/characters/rocky-full-alpha.png";

  spawnProbability: number = 1;
  level = 15;

  isEligibleForTile(_: TileType, coords: [number, number]) {
    return spawnPositions.has(coords.join(','));
  }

  // Dodging rocky's attacks is really hard
  getDodgeTimeLimit(): number {
    return 25;
  }

  receiveAttack(attackType: string, attacker: BaseCharacter) {
    super.modifyHealth(-25 * attacker.getLevel());

    return attacker.getLevel() < 5
      ? AttackEffectiness.WEAK
      : AttackEffectiness.STRONG;
  }

  getAttackTypes = () => [
    "Unleash the Minions",
    "Ground Stomp",
    "Thunderous Roar",
    "Sword Swing",
  ];
}
