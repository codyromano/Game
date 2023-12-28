import { GameState } from "../GameStateProvider";
import BaseItem from "./BaseItem";
import HealthItem from "./HealthItem";
import LevelUpStarItem from "./LevelUpStarItem";

const itemCache: Record<string, BaseItem> = {};

export default class ItemFactory {
  // Create a new item object
  static create(itemInfo: GameState['items'][string]): BaseItem {
    const {coords} = itemInfo;
    const cacheKey = coords.join(',');

    if (itemCache[cacheKey] == null) {
      itemCache[cacheKey] = ItemFactory.createWithoutCache(itemInfo);
    }
    return itemCache[cacheKey];
  }

  static createWithoutCache({ itemName, coords}: GameState['items'][string]): BaseItem {
    let item;

      switch (itemName) {
        case 'levelUpStar':
          item = new LevelUpStarItem(coords);
        break;
        case 'health':
          item = new HealthItem(coords);
        break;
        default:
          throw new Error(`No item named ${itemName}`);
        break;
      }
    return item;
  }

  static getItemAtCoords(coords: [number, number]): BaseItem | null {
    return itemCache[coords.join(',')];
  }

  static removeItem(coords: [number, number]) {
    delete itemCache[coords.join(',')];
  }

  // Load an item object from existing game state
  static deserialize({itemName, timeLastUsed, coords}: GameState['items'][string]): BaseItem {
    const item: BaseItem = ItemFactory.create({ itemName, timeLastUsed, coords});
    if (item && timeLastUsed != null) {
      item.setTimeLastUsed(timeLastUsed);
    }
    return item ?? null;
  }
  static getAllItems(): BaseItem[] {
    // TODO: Hack, should be able to get item without specifying dummy coords 
    // This is just used to extract list of image srcs
    return [new LevelUpStarItem([0, 0]), new HealthItem([0, 0])];
  }
}
