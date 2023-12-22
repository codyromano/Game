import { TileType } from "../explore/tiles";

export enum AttackEffectiness {
  MISS,
  WEAK,
  MEDIUM,
  STRONG,
}

export default abstract class BaseCharacter {
  abstract readonly name: string;
  abstract readonly imageOptimized: string;
  abstract readonly imageFull: string;
  protected level: number = 1;

  protected health: number = 100;

  protected spawnProbability: number = 1;

  abstract receiveAttack(
    attackType: string,
    attacker: BaseCharacter,
  ): AttackEffectiness;

  abstract isEligibleForTile(tile: TileType): boolean;
  abstract getAttackTypes(): string[];

  getLevel(): number {
    return this.level;
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
}
