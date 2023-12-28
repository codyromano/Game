import BaseCharacter from "../characters/BaseCharacter";
import { TileType } from "../explore/tiles";

let _id = 0;

type UseItemResult = {
  effectDescription: string;
};

export default abstract class BaseItem {
  private id: string;

  abstract readonly name: string;
  abstract readonly displayName: string;
  abstract readonly imageOptimized: string;
  abstract readonly imageFull: string;

  private timeLastUsed: number = 0;
  protected respawnAfterMs: number = 86400;

  constructor() {
    this.id = `${Date.now()}_${++_id}`;
  }

  protected abstract isEligibleForTileImpl(tileType: TileType, coords: [number, number]): boolean;
  protected abstract useItemImpl(player: BaseCharacter): UseItemResult;

  useItem(player: BaseCharacter): UseItemResult {
    this.timeLastUsed = Date.now();
    return this.useItemImpl(player);
  }

  isEligibleForTile(tileType: TileType, coords: [number, number]): boolean {
    if (Date.now() - this.timeLastUsed)
  }
}