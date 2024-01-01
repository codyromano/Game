type LoadItem = {
  key: string;
  src: string;
  promise: Promise<HTMLImageElement>;
};

// Testing 

export default async function preloadImages(
  imageMap: Record<string, string>,
  onLoad: (key: string, image: HTMLImageElement) => void,
): Promise<Record<string, HTMLImageElement>> {
  const loadQueue: LoadItem[] = [];
  const result: Record<string, HTMLImageElement> = {};

  for (const imageKey in imageMap) {
    loadQueue.push({
      key: imageKey,
      src: imageMap[imageKey],
      promise: new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          result[imageKey] = image;
          onLoad(imageKey, image);
          resolve(image);
        };
        image.onerror = () => {
          reject(`Failed to load image: ${imageMap[imageKey]}`);
        };
        image.src = imageMap[imageKey];
      }),
    });
  }

  await Promise.all(loadQueue.map(({ promise }) => promise));
  return result;
}
