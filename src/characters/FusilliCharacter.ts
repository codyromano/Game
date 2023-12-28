import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

const spawnPositions: Set<string> = new Set(['20,3', '19,5', '20,7']);
// const spawnPositions = new Set();

export default class FusilliCharacter extends BaseCharacter {
  readonly characterName: string = "Bananacoon";
  readonly imageOptimized: string = "/images/characters/fusilli-optimized.png";
  readonly imageFull: string = "/images/characters/fusilli-full-alpha.png";

  level = 10;
  spawnProbability = 1;

  isEligibleForTile(_: TileType, coords: [number, number]) {
    return spawnPositions.has(coords.join(','));
  }

  getDodgeTimeLimit(): number {
    return 100;
  }

  receiveAttack(attackType: string, attacker: BaseCharacter) {
    // TODO: Damage should depend on level
    switch (attackType) {
      case MomoAttacks.BARK:
      case MomoAttacks.GROWL:
        super.modifyHealth(-attacker.getLevel() * 5);
        return AttackEffectiness.WEAK;
      case MomoAttacks.TWIRL_BOWTIE:
        super.modifyHealth(-attacker.getLevel() * 10);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Banana Pants", "Crazy Eye", "Hat Swing"];
}
