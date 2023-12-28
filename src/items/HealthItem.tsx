import BaseCharacter from "../characters/BaseCharacter";
import BaseItem, { ItemName, UseItemResult } from "./BaseItem";

const spawnLocations = new Set([
  "1,1",
  "1,10",
  "28,1",
  "29,1",
  "10,35",
  "3,46",
  "15,4",
  "13,23",
  "10,47"
]);

export default class HealthItem extends BaseItem {
  readonly itemName: ItemName = "health";
  readonly displayName = "Health";
  readonly imageOptimized = "images/items/health_optimized.png";
  readonly imageFull = "images/items/health.png";

  // Basically never lol
  readonly respawnAfterMs = 86400000000;

  useItemImpl(player: BaseCharacter): UseItemResult {
    player.modifyHealth(15);
    return {
      effectDescription: `You gained 15 points of health.`,
    };
  }

  protected isEligibleForTileImpl() {
    return spawnLocations.has(this.getCoords().join(","));
  }
}
