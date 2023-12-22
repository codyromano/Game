import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

export default class MagicoonCharacter extends BaseCharacter {
  readonly name: string = "magicoon";
  readonly imageOptimized: string = "/images/magicoon-small.png";
  readonly imageFull: string = "/images/magicoon-full-alpha.png";

  spawnProbability: number = 0.05;

  isEligibleForTile(tile: TileType) {
    return tile === "road" || tile === "grass";
  }

  receiveAttack(attackType: string) {
    switch (attackType) {
      case MomoAttacks.BARK:
      case MomoAttacks.GROWL:
        super.modifyHealth(-25);
        return AttackEffectiness.WEAK;
      case MomoAttacks.TWIRL_BOWTIE:
        super.modifyHealth(-50);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Wand Twirl", "Trash Toss"];
}
