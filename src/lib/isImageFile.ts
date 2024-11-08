export const isImageFile = (path: string): boolean =>
  /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(path);
