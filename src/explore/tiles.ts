export type TileType =
  | "grass"
  | "road"
  | "forest"
  | "water"
  | "flowers"
  | "tree"
  | "marble"
  | "fusilliMarble" | "rockyMarble" | "sand";

export const tileAttributes: {
  [key in TileType]: {
    traversable: boolean;
  };
} = {
  grass: {
    traversable: true,
  },
  road: {
    traversable: true,
  },
  forest: {
    traversable: true,
  },
  water: {
    traversable: true,
  },
  flowers: {
    traversable: true,
  },
  tree: {
    traversable: false,
  },
  marble: {
    traversable: true,
  },
  fusilliMarble: {
    traversable: true,
  },
  sand: {
    traversable: true,
  },
  rockyMarble: {
    traversable: true,
  }
};

class MapBuilder {
  private map: TileType[][] = [];
  private mapRow: TileType[] = [];

  tile(tileType: TileType): MapBuilder {
    return this.tiles(1, tileType);
  }

  tiles(n: number, ...sequence: TileType[]): MapBuilder {
    for (let i = 0; i < n; i++) {
      this.mapRow.push(sequence[i % sequence.length]);
    }
    return this;
  }

  // Apply a sequence of tiles to a new row matching the width of the previous row
  matchPreviousRowLength(...sequence: TileType[]): MapBuilder {
    const previousRowWidth = this.map[this.map.length - 1].length;
    this.tiles(previousRowWidth, ...sequence);
    return this;
  }

  repeatColumns(n: number = 1): MapBuilder {
    const colsToRepeat = this.mapRow;

    for (let i = 0; i < n; i++) {
      this.mapRow = [...this.mapRow, ...colsToRepeat];
    }
    return this;
  }
  repeatRow(n: number = 1): MapBuilder {
    this.endRow();

    const rowToRepeat = this.map[this.map.length - 1];

    for (let i = 0; i < n; i++) {
      this.map.push([...rowToRepeat]);
    }

    return this;
  }
  endRow(): MapBuilder {
    this.map.push(this.mapRow);
    this.mapRow = [];
    return this;
  }
  done(): TileType[][] {
    return this.map;
  }
}

const map = new MapBuilder();

const tiles: TileType[][] = map
  .tiles(5, "tree")
  .tile("rockyMarble")
  .tiles(43, "tree")
  .endRow()
  .tiles(5, "tree")
  .tile("marble")
  .tiles(43, "tree")
  .repeatRow(5)
  .tiles(5, "tree")
  .tile("fusilliMarble")
  .tiles(43, "tree")
  .endRow()
  .tiles(4, "tree")
  .tiles(5, "road")
  .tiles(3, "grass")
  .repeatColumns(3)
  .endRow()
  .tiles(3, "tree")
  .tile("road")
  .tiles(3, "flowers")
  .tile("road")
  .tiles(3, "grass")
  .repeatColumns(3)
  .repeatRow(2)
  .tiles(3, "tree")
  .tiles(5, "road")
  .tiles(3, "grass")
  .repeatColumns(3)
  .repeatRow(2)
  .tiles(3, "grass")
  .tile("road")
  .matchPreviousRowLength("sand")
  .endRow()
  .tiles(3, "sand")
  .tile("road")
  .tiles(6, "sand")
  .tile("road")
  .matchPreviousRowLength("road")
  .endRow()
  // Ocean with bridge
  .matchPreviousRowLength(
    "water",
    "water",
    "water",
    "road",
    "water",
    "water",
    "water",
  )
  .repeatRow(10)
  .matchPreviousRowLength("road")
  .endRow()
  .matchPreviousRowLength("grass")
  .repeatRow(15)
  .done();


export default tiles;
