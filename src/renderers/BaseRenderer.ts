export type RenderContext = {
  // Upper-left corner of bounding box
  x: number;
  y: number;

  // Bounding box height & width
  height: number;
  width: number;
};

export default abstract class BaseRenderer<TAttributes extends {}> {
  abstract setAttributes(attributes: Partial<TAttributes>): void;
  abstract render(canvas: CanvasRenderingContext2D, context: RenderContext): void;
  abstract getImages(): Promise<Record<string, HTMLImageElement>>;
}