import BaseCharacter from "./BaseCharacter";
import BubblesCharacter from "./BubblesCharacter";
import MagicoonCharacter from "./MagicoonCharacter";
import FusilliCharacter from "./FusilliCharacter";
import RockyCharacter from "./RockyCharacter";

export default class CharacterFactory {
  static create(name: string): BaseCharacter {
    switch (name) {
      case MagicoonCharacter.name:
        return new MagicoonCharacter();
      case BubblesCharacter.name:
        return new BubblesCharacter();
      case FusilliCharacter.name:
        return new FusilliCharacter();
      case RockyCharacter.name:
        return new RockyCharacter();
      default:
        throw new Error(`No character named ${name}`);
    }
  }
  static getAllCharacters(): BaseCharacter[] {
    return [new MagicoonCharacter(), new BubblesCharacter(), new FusilliCharacter(), new RockyCharacter()];
  }
}
