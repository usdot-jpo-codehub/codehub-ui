export class ChunkValueConverter {
  toView(array, size) {
    const result = [];
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
