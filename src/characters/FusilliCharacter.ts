import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

export default class FusilliCharacter extends BaseCharacter {
  readonly name: string = "fusilli";
  readonly imageOptimized: string = "/images/characters/fusilli-optimized.png";
  readonly imageFull: string = "/images/characters/fusilli-full-alpha.png";

  level = 10;
  spawnProbability = 1;

  isEligibleForTile(tile: TileType) {
    return tile === "fusilliMarble";
  }

  receiveAttack(attackType: string) {
    // TODO: Damage should depend on level
    switch (attackType) {
      case MomoAttacks.BARK:
      case MomoAttacks.GROWL:
        super.modifyHealth(-25);
        return AttackEffectiness.WEAK;
      case MomoAttacks.TWIRL_BOWTIE:
        super.modifyHealth(-20);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Banana Pants", "Crazy Eye", "Hat Swing"];
}
