import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

const spawnPositions: Set<string> = new Set(['4,5', '7,7', '12,5']);

export default class BubblesCharacter extends BaseCharacter {
  readonly characterName: string = "Aquaticoon";
  readonly imageOptimized: string = "/images/bubbles-small.png";
  readonly imageFull: string = "/images/bubbles-full-alpha.png";

  spawnProbability: number = 1;
  level = 2;

  isEligibleForTile(_: TileType, coords: [number, number]) {
    return spawnPositions.has(coords.join(','));
  }

  receiveAttack(attackType: string) {
    switch (attackType) {
      case MomoAttacks.TWIRL_BOWTIE:
      case MomoAttacks.GROWL:
        super.modifyHealth(-10);
        return AttackEffectiness.WEAK;
      case MomoAttacks.BARK:
        super.modifyHealth(-50);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Big Splash", "Undertow"];
}
