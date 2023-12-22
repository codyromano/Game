import storyText from "./storyText";


export default class Story {
  static getStoryText(linesRevealed: number): string[] {
    return storyText.slice(0, linesRevealed);
  }
  static getTotalLines(): number {
    return storyText.length;
  }

  static getProgressPercentage(linesRevealed: number): number {
    return Math.floor(
      Math.min(100, (linesRevealed / Story.getTotalLines()) * 100),
    );
  }
}
