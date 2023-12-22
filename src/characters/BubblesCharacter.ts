import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

export default class BubblesCharacter extends BaseCharacter {
  readonly name: string = "bubbles";
  readonly imageOptimized: string = "/images/bubbles-small.png";
  readonly imageFull: string = "/images/bubbles-full-alpha.png";

  spawnProbability: number = 0.05;
  level = 2;

  isEligibleForTile(tile: TileType) {
    return tile === "water";
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
