export class CardCategory {
  constructor() {
    this.category = {};
    this.categoryId = null;
  }

  activate(data) {
    if (data) {
      this.category = data;
      this.categoryId = this.category.id+"|"+this.category.name;
    }
  }
}
