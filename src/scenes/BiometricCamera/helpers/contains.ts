export interface Rect {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

interface Contains {
  outside: Rect;
  inside: Rect;
}

/**
 * @returns `true` if `outside` rectangle contains the `inside` rectangle.
 * */
export function contains({ outside, inside }: Contains) {
  const outsideMaxX = outside.minX + outside.width;
  const insideMaxX = inside.minX + inside.width;

  const outsideMaxY = outside.minY + outside.height;
  const insideMaxY = inside.minY + inside.height;

  if (inside.minX < outside.minX) {
    return false;
  }
  if (insideMaxX > outsideMaxX) {
    return false;
  }
  if (inside.minY < outside.minY) {
    return false;
  }
  if (insideMaxY > outsideMaxY) {
    return false;
  }

  return true;
}
