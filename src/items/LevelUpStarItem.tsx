import BaseCharacter from "../characters/BaseCharacter";
import BaseItem, { ItemName, UseItemResult } from "./BaseItem";

const spawnLocations = new Set([
  "9,8",
  "10,12",
  "13,12",
  "19,24",
  "20,56",
]);

export default class LevelUpStarItem extends BaseItem {
  readonly itemName: ItemName = "levelUpStar";
  readonly displayName = "Level Up Star";
  readonly imageOptimized = "images/items/levelupstar_optimized.png";
  readonly imageFull = "images/items/levelupstar.png";

  // Basically never lol
  readonly respawnAfterMs = 86400000000;

  useItemImpl(player: BaseCharacter): UseItemResult {
    player.modifyLevel(1);
    return {
      effectDescription: `The star increases your attack strength. Welcome to level ${player.getLevel()}!`,
    };
  }

  protected isEligibleForTileImpl() {
    return spawnLocations.has(this.getCoords().join(","));
  }
}
