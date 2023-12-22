import React, { useEffect, useState } from "react";
import CharacterFactory from "../characters/CharacterFactory";

// import characters from "./characters";
import preloadImages from "./preloadImages";
import tileImages from "./tileImages";

export type BootstrapPayload = {
  images: Record<string, HTMLImageElement>;
};

const characters = CharacterFactory.getAllCharacters();

const totalImagesToLoad = Object.keys(tileImages).length + characters.length;

// TODO: Throw error when an image fails to load
export default function PreloadAssets({
  children,
}: {
  children: (payload: BootstrapPayload) => React.ReactElement;
}): React.ReactElement {
  const [loadCount, setLoadCount] = useState<[number, number]>([
    0,
    totalImagesToLoad,
  ]);
  const [images, setImages] = useState<Record<string, HTMLImageElement> | null>(
    null,
  );

  const preload = async () => {
    const loaded: Set<string> = new Set();
    const updateImageLoadCount = (imageKey: string) => {
      loaded.add(imageKey);
      setLoadCount((count) => [loaded.size, count[1]]);
    };

    const tileTerrainImages = await preloadImages(
      tileImages,
      updateImageLoadCount,
    );

    // Load images for characters
    const characterImages = await preloadImages(
      characters.reduce(
        (result, c) => {
          result[c.name] = c.imageOptimized;
          return result;
        },
        {} as Record<string, string>,
      ),
      updateImageLoadCount,
    );

    setImages(Object.assign({}, tileTerrainImages, characterImages));
  };

  useEffect(() => {
    preload();
  }, []);

  return images != null ? (
    children({ images })
  ) : (
    <div>
      Loaded {loadCount[0]} of {loadCount[1]} graphics
    </div>
  );
}
