export class ChunkValueConverter {
  toView(array, size) {
    const result = [];
    if(!array) {
      return result;
    }

    if (!size || size<= 0) {
      size = 1;
    }

    for (let i = 0; i < array.length; i += size) {
      const chunks = array.slice(i, i + size);
      if (chunks.length < size) {
        for (let j = 0; j < size - chunks.length; j++) {
          chunks.push(null);
        }
      }
      result.push(chunks);
    }
    return result;
  }
}
