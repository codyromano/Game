import { TileType } from "../explore/tiles";
import BaseCharacter, { AttackEffectiness } from "./BaseCharacter";
import { MomoAttacks } from "./MomoCharacter";

const spawnPositions: Set<string> = new Set(['10,14', '9,20', '2,46', '9,33']);

export default class MagicoonCharacter extends BaseCharacter {
  readonly characterName: string = "magicoon";
  readonly imageOptimized: string = "/images/magicoon-small.png";
  readonly imageFull: string = "/images/magicoon-full-alpha.png";

  spawnProbability: number = 1;

  isEligibleForTile(_: TileType, coords: [number, number]) {
    return spawnPositions.has(coords.join(','));
  }

  receiveAttack(attackType: string, attacker: BaseCharacter) {
    switch (attackType) {
      case MomoAttacks.BARK:
      case MomoAttacks.GROWL:
        super.modifyHealth(-attacker.getLevel() * 5);
        return AttackEffectiness.WEAK;
      case MomoAttacks.TWIRL_BOWTIE:
        super.modifyHealth(-attacker.getLevel() * 25);
        return AttackEffectiness.STRONG;
      default:
        return AttackEffectiness.MISS;
    }
  }

  getAttackTypes = () => ["Wand Twirl", "Trash Toss"];
}
