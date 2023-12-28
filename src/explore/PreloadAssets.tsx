import React, { useEffect, useState } from "react";
import CharacterFactory from "../characters/CharacterFactory";

// import characters from "./characters";
import preloadImages from "./preloadImages";
import tileImages from "./tileImages";
import ItemFactory from "../items/ItemFactory";

export type BootstrapPayload = {
  images: Record<string, HTMLImageElement>;
};

const characters = CharacterFactory.getAllCharacters();
const items = ItemFactory.getAllItems();

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
  const [message, setMessage] = useState<string>('Drawing game world...');

  const preload = async () => {
    const loaded: Set<string> = new Set();

    const updateImageLoadCount = (imageKey: string) => {
      loaded.add(imageKey);
      setLoadCount((count) => [loaded.size, count[1]]);
    };


    try {
      const tileTerrainImages = await preloadImages(
        tileImages,
        updateImageLoadCount,
      );

      // Load images for characters
      const characterImages = await preloadImages(
        characters.reduce(
          (result, c) => {
            result[c.characterName] = c.imageOptimized;
            return result;
          },
          {} as Record<string, string>,
        ),
        updateImageLoadCount,
      );

        // Load images for items
        const itemImages = await preloadImages(
          items.reduce(
            (result, c) => {
              result[c.itemName] = c.imageOptimized;
              return result;
            },
            {} as Record<string, string>,
          ),
          updateImageLoadCount,
        );

      setImages(Object.assign({}, tileTerrainImages, characterImages, itemImages));
          } catch (error) {
            setMessage('Network error. 😢 Please try reloading.')
          }
  };

  useEffect(() => {
    preload();
  }, []);

  return images != null ? (
    children({ images })
  ) : (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
    }}>
      <progress value={loadCount[0]} max={loadCount[1]} />
      <div style={{color: '#fff', fontFamily: "Helvetica"}}>{message}</div>
    </div>
  );
}
