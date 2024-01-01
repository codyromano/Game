import { GameState } from "../GameStateProvider";

export type RenderContext = {
  canvas: CanvasRenderingContext2D;
  state: GameState;
  frame: {
    time: DOMHighResTimeStamp;

    // Upper-left corner of bounding box
    x: number;
    y: number;

    // Bounding box height & width
    height: number;
    width: number;
  }
};



export default abstract class BaseRenderer {
  abstract render(context: RenderContext): void;
  abstract getImages(): Promise<Record<string, HTMLImageElement>>;
}