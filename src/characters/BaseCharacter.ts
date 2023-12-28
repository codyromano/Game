import { TileType } from "../explore/tiles";

export enum AttackEffectiness {
  MISS,
  WEAK,
  MEDIUM,
  STRONG,
}

export default abstract class BaseCharacter {
  abstract readonly characterName: string;
  abstract readonly imageOptimized: string;
  abstract readonly imageFull: string;
  protected level: number = 1;

  protected health: number = 100;

  protected spawnProbability: number = 1;

  abstract receiveAttack(
    attackType: string,
    attacker: BaseCharacter,
  ): AttackEffectiness;

  abstract isEligibleForTile(tile: TileType, coords: [number, number]): boolean;
  abstract getAttackTypes(): string[];

  getLevel(): number {
    return this.level;
  }

  // Time in ms you have to dodge when fighting this character
  getDodgeTimeLimit(): number {
    return 250;
  }

  // The likelihood of a character spawning IF the
  // character is eligible to appear on a tile
  getSpawnProbability(): number {
    return this.spawnProbability;
  }

  getNextAttackType(): string {
    const attackTypes = this.getAttackTypes();
    return attackTypes[Math.floor(Math.random() * attackTypes.length)];
  }

  readonly getHealth = () => this.health;

  modifyHealth(amount: number) {
    this.health += amount;

    // Clamp 0-100
    this.health = Math.min(Math.max(this.health, 0), 100);
  }

  modifyLevel(amount: number) {
    this.level += amount;
    // Level cannot be less than 1
    this.level = Math.max(this.level, 1);
  }
}
