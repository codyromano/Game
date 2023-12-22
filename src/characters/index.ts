import BaseCharacter from "./BaseCharacter";
import CharacterFactory from "./CharacterFactory";

// const characters: BaseCharacter[] = [new MagicoonCharacter()];
const characters: BaseCharacter[] = CharacterFactory.getAllCharacters();

export default characters;
