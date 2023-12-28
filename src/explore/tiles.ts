export type TileType =
  | "gras"
  | "wall"
  | "fore"
  | "wate"
  | "flow"
  | "tree"
  | "marb"
  | "lava"
  | "fuma" // fusilli marble
  | "roma" // rocky marble
  | "sand";

export const tileAttributes: {
  [key in TileType]: {
    traversable: boolean;
  };
} = {
  gras: {
    traversable: true,
  },
  wall: {
    traversable: false,
  },
  fore: {
    traversable: true,
  },
  wate: {
    traversable: true,
  },
  flow: {
    traversable: true,
  },
  tree: {
    traversable: false,
  },
  marb: {
    traversable: true,
  },
  fuma: {
    traversable: true,
  },
  sand: {
    traversable: true,
  },
  roma: {
    traversable: true,
  },
  lava: {
    traversable: true
  }
};
const tiles: TileType[][] = [

  // Rows 1-10
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
  ["wall", "sand", "sand", "sand", "wall", "wate", "wate", "wate", "wate", "wall", "wate", "wate", "wate", "wate", "wate", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","tree","gras","gras","gras","gras","gras","gras","wall","gras","gras","gras","gras","gras","gras","gras","tree","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wall", "wate", "wall", "wate", "wate", "wall", "wate", "wate", "wate", "wate", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","tree","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","gras","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wall", "wate", "wall", "wate", "wate", "wall", "wate", "wate", "wate", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras", "gras", "gras","gras","gras","gras","gras","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","gras","wall","gras","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wall", "wate", "wall", "wate", "wate", "wall", "wate", "wate", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","gras","wall","gras","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wall", "sand", "wall", "wate", "wate", "wall", "wate", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","wall","gras","wall","gras","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wall", "sand", "wall", "wate", "wate", "wall", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","wall","gras","gras","gras","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wate", "sand", "wall", "wate", "wall", "wall", "sand", "sand", "sand", "sand", "sand", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "wate", "sand", "wall", "wate", "wate", "wall", "sand", "sand", "sand", "sand", "sand", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wall", "sand", "sand", "sand", "wall", "wate", "wate", "wall", "sand", "wall", "wall", "wall", "wall", "wall", "gras", "wall", "wall", "wall", "gras", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","tree","gras","tree","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
  
  // Rows 11-20
  ["wall", "sand", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "sand", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","tree","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "wate", "wate", "wate", "wate", "wate", "wate", "wate", "sand", "sand", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","sand","sand","wall"],
  ["wall", "sand", "sand", "wate", "wate", "wate", "wate", "wate", "sand", "sand", "sand", "tree", "tree", "tree", "tree", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","sand","sand","sand","wall"],
  ["wall", "sand", "sand", "sand", "wate", "wate", "wate", "sand", "sand", "sand", "sand", "tree", "gras", "tree", "tree", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","sand","gras","gras","gras","gras","gras","gras","sand","sand","gras","gras","gras","gras","wall"],
  ["wall", "sand", "sand", "sand", "sand", "wate", "sand", "sand", "sand", "sand", "sand", "tree", "tree", "gras", "tree", "gras", "gras", "gras", "gras", "gras", "wall", "wall", "gras", "gras", "gras", "gras","wall","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","gras","sand","sand","sand","sand","gras","gras","gras","sand","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "tree", "tree", "tree", "tree", "gras", "gras", "gras", "gras", "gras", "gras", "wall", "sand", "sand", "sand", "sand", "sand","sand","wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","gras","gras","gras","gras","gras","sand","sand","sand","sand","sand","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "tree", "tree", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","sand","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "tree", "tree", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "sand", "sand", "sand", "sand", "sand", "sand", "gras", "gras", "gras", "gras", "wall", "gras", "gras", "gras", "wall", "gras", "gras", "gras", "wall", "gras", "sand", "lava", "lava", "lava", "lava","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","sand","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "sand", "lava", "lava", "lava", "lava","sand","gras","gras","gras","gras","gras","gras","gras","gras", "sand","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
      
  // Rows 21-30
  ["wall", "marb", "wall", "marb", "wall", "marb", "wall", "marb", "wall", "gras", "gras", "gras", "gras", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand","gras","gras","gras","gras","gras","gras", "sand","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","lava","lava","wall","lava","wall"],
  ["wall", "marb", "tree", "marb", "tree", "marb", "tree", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand", "gras","gras","gras","gras","sand","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","wall","wall","wall","lava","wall"],
  ["wall", "marb", "wall", "marb", "wall", "marb", "wall", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand", "gras","sand","sand","sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","wall","lava","lava","lava","wall"],
  ["wall", "marb", "tree", "marb", "tree", "marb", "tree", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand", "sand","sand","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","lava","lava","lava","lava","wall"],
  ["wall", "marb", "wall", "marb", "wall", "marb", "wall", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "sand", "lava", "lava", "lava", "lava","sand", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","lava","lava","lava","lava","wall"],
  ["wall", "marb", "tree", "marb", "tree", "marb", "tree", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "wall", "sand", "sand", "sand", "sand", "sand","sand", "wall","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall","lava","lava","lava","lava","lava","wall"],
  ["wall", "marb", "wall", "marb", "wall", "marb", "wall", "marb", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
  ["wall", "marb", "tree", "marb", "tree", "marb", "tree", "marb", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
  ["wall", "marb", "wall", "marb", "wall", "marb", "wall", "marb", "wall", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","wall"],
  ["wall", "marb", "tree", "marb", "tree", "tree", "tree", "marb", "wall", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree", "tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","tree","wall"],
  
  // Rows 31-40
  ["wall", "wall", "wall", "marb", "wall", "wall", "wall", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "marb", "marb", "marb", "marb", "marb", "marb", "marb", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras", "gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","gras","wall"],
  ];
  
  

export default tiles;
