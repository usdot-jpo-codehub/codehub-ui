import { bindable } from 'aurelia-framework';

export class ChDropdown {
  @bindable title;
  @bindable header;
  @bindable collection;
  @bindable selectedItems;
  @bindable selectedValues;
  @bindable picker;
  @bindable onitemchanged;
  @bindable onvaluechanged;
  constructor() {
    this.options = {
      width: 'data',
      actionsBox: true,
      dropupAuto: true,
      liveSearch:true,
      title: '',
      selectedTextFormat: 'count',
      countSelectedText: `{0}`,
      header: '',
      subtext: 'subtext',
      showSubtext: true
    };
    this.mapping = {
      subtext: 'subtext'
    };
    this.selectedCounter = 0;
    this.onChange = null;
    this.collection = null;
    this.id = "id";
    this.picker = null;
  }

  pickerChanged(val) {
    this.picker = val;
  }
  titleChanged(val) {
    this.options.title = val;
    this.options.countSelectedText = `${this.options.title} ({0})`;
  }
  headerChanged(val) {
    this.options.header = val;
  }
  onchangeChanged(val) {
    this.onChange = val;
  }
  collectionChanged(val) {
    this.collection = val;
  }
  idChanged(val) {
    this.id = val;
  }

  selectedItemsChanged(val) {
    if (this.onitemchanged) {
      this.onitemchanged(val);
    }
  }

  selectedValuesChanged(val) {
    if(this.onvaluechanged) {
      this.onvaluechanged(val);
    }
  }

  deselectAll() {
    if(this.picker) {
      this.picker.deselectAll();
    }
  }
}