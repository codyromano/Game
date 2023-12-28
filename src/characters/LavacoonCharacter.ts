import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

const spawnPositions: Set<string> = new Set([
  '16,22',
  '16,25',
  '24,22',
  '24,25',
  '20,23',
  '20,24',
  '20,25',
  '19,25',
  '18,25',
  '18,24',
  '18,23',
  '19,23',
  "20,55",
]);

export default class LavacoonCharacter extends BaseCharacter {
  readonly characterName: string = "Lavacoon";
  readonly imageOptimized: string = "/images/characters/lavacoon-optimized.png";
  readonly imageFull: string = "/images/characters/lavacoon-full-alpha.png";
  level = 6;
  spawnProbability: number = 1;

  isEligibleForTile(_: TileType, coords: [number, number]) {
    return spawnPositions.has(coords.join(','));
  }

  receiveAttack(attackType: string, attacker: BaseCharacter) {
    switch (attackType) {
      case MomoAttacks.TWIRL_BOWTIE:
      case MomoAttacks.GROWL:
        super.modifyHealth(-attacker.getLevel() * 5);
        return AttackEffectiness.WEAK;
      case MomoAttacks.BARK:
        super.modifyHealth(-attacker.getLevel() * 30);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Inferno", "Fire Boulder", "Smoke Spray", "Megaburn"];
}
