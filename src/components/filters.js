import $ from 'jquery';

export class Filters {
  constructor() {
    this.selectedOrganizations = [];
    this.selectedLanguages = [];
  }

  getUniqueValues(array, property) {
    const propertyArray = [];
    for (const object of array) {
      let v = this.getNested(object, property);
      if (v) {
        propertyArray.push(v);
      } else {
        propertyArray.push('None');
      }
    }
    return Array.from(new Set(propertyArray));
  }

  getNested(obj, prop) {
    let props = prop.split('.');
    let result = props.reduce((obj, level) => obj && obj[level], obj);
    return result;
  }

  toggleOrg(event, projects) {
    if (event.target.checked) {
      this.selectedOrganizations = this.getUniqueValues(projects, 'sourceData.owner.name');
      return true;
    }
    this.selectedOrganizations = [];
    return true;
  }

  toggleLang(event, projects) {
    if (event.target.checked) {
      this.selectedLanguages = this.getUniqueValues(projects, 'sourceData.language');
      return true;
    }
    this.selectedLanguages = [];
    return true;
  }

}
