import { TileType } from "../explore/tiles";
import BaseRenderer, { RenderContext } from "./BaseRenderer";

type RendererAttributes = {
  tileType: TileType,
};

type TileImages = 'sand' | 'road' | 'water';

export default class TileRenderer extends BaseRenderer<RendererAttributes, TileImages> {
  tileType: TileType | undefined;

  setAttributes(attributes: Partial<RendererAttributes>): void {
    this.tileType = attributes.tileType;
  }
  render(canvas: CanvasRenderingContext2D, { x, y}: RenderContext) {
    canvas.drawImage(
      images[tileType],
      x,
      y,
      tileSize,
      tileSize,
    );
  }
  async getImages() {
    
  }
}