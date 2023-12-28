import BaseCharacter from "./BaseCharacter";
import BubblesCharacter from "./BubblesCharacter";
import MagicoonCharacter from "./MagicoonCharacter";
import FusilliCharacter from "./FusilliCharacter";
import RockyCharacter from "./RockyCharacter";
import LavacoonCharacter from "./LavacoonCharacter";

class MapPositionCache<T> {
  private items: Record<string, T> = {};
  private static getKey = (x: number, y: number) => `${x},${y}`;

  setItem(x: number, y: number, item: T) {
    const key = MapPositionCache.getKey(x, y);
    this.items[key] = item;
  }

  hasItem(x: number, y: number): boolean {
    const key = MapPositionCache.getKey(x, y);
    return this.items[key] != null;
  }

  getItem(x: number, y: number): T | null {
    const key = MapPositionCache.getKey(x, y);
    return this.items[key];
  }
}

const characterMapCache = new MapPositionCache<BaseCharacter>();

export default class CharacterFactory {
  static create(name: string): BaseCharacter {
    const characters = CharacterFactory.getAllCharacters();
    const match = characters.find(c => c.characterName === name);

    if (!match) {
      throw new Error(`No character named ${name}`);
    }
    return match;
  }
  static createAtPosition(x: number, y: number, name: string) {
    if (!characterMapCache.hasItem(x, y)) {
      characterMapCache.setItem(x, y, CharacterFactory.create(name));
    }
    return characterMapCache.getItem(x, y);
  }
  static getAtPosition(x: number, y: number): BaseCharacter | null {
    return characterMapCache.getItem(x, y);
  }
  static getAllCharacters(): BaseCharacter[] {
    return [
      new MagicoonCharacter(),
      new BubblesCharacter(),
      new FusilliCharacter(),
      new RockyCharacter(),
      new LavacoonCharacter()
    ];
  }
}
