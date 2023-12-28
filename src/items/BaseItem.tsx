import BaseCharacter from "../characters/BaseCharacter";
import { TileType } from "../explore/tiles";
import { GameState } from "../GameStateProvider";
import { Serializable } from "../utils/Serializable";

let _id = 0;

export type UseItemResult = {
  effectDescription: string;
};

export type ItemName = 'levelUpStar' | 'health';

export default abstract class BaseItem implements Serializable<BaseItem> {
  private id: string;

  abstract readonly itemName: ItemName;
  abstract readonly displayName: string;
  abstract readonly imageOptimized: string;
  abstract readonly imageFull: string;
  abstract readonly respawnAfterMs: number;

  private timeLastUsed: number | null = null;
  private coords: [number, number];
  private lastUseItemResult: UseItemResult | null = null;

  constructor(coords: [number, number]) {
    this.id = `${Date.now()}_${++_id}`;
    this.coords = coords;
  }

  getCoords(): [number, number] {
    return this.coords;
  }

  getTimeLastUsed(): number | null {
    return this.timeLastUsed;
  }

  setTimeLastUsed(time: number) {
    this.timeLastUsed = time;
  }

  protected abstract isEligibleForTileImpl(
    tileType: TileType,
    coords: [number, number],
  ): boolean;
  protected abstract useItemImpl(player: BaseCharacter): UseItemResult;

  getLastUseItemResult(): UseItemResult | null {
    return this.lastUseItemResult;
  }

  useItem(player: BaseCharacter): UseItemResult {
    if (this.isUsable()) {
      this.timeLastUsed = Date.now();
      this.lastUseItemResult = this.useItemImpl(player);
      return this.lastUseItemResult;
    }
    return {
      effectDescription: "You've already used this item!",
    };
  }

  private isUsable(): boolean {
    return this.timeLastUsed === null || Date.now() - this.timeLastUsed > this.respawnAfterMs;
  }

  isEligibleForTile(tileType: TileType): boolean {
    if (!this.isUsable()) {
      return false;
    }
    return this.isEligibleForTileImpl(tileType, this.getCoords());
  }

  serialize(gameState: GameState): GameState {
    return {
      ...gameState,
      items: {
        ...gameState.items,
        [this.getCoords().join(",")]: {
          itemName: this.itemName,
          timeLastUsed: this.timeLastUsed,
          coords: this.getCoords(),
        },
      },
    };
  }
}
