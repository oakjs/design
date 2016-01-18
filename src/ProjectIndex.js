"use strict";
//////////////////////////////
//
// `ProjectIndex` data file wrapper.
//
//////////////////////////////



//////////////////////////////
// Component map normalizing
//////////////////////////////

// Given a list of (possibly nested) component records, return a map of {<namedPath>: <component record>}.
// NOTE: modifies the components passed in!
function makeComponentMap(componentsList, pathPrefix="") {
  const map = {};

  componentsList.forEach( function (component) {
    const { path, components, globalize, modified } = component;

    if (components) {
      components.forEach( function(component) {
        addToComponentMap(map, component, pathPrefix+path, globalize);
      });
    }
    else {
      addToComponentMap(map, component, pathPrefix, globalize);
    }
  }
  return map;

  function addToComponentMap(map, component, pathPrefix, globalize) {
    component.fullPath = pathPrefix + component.path;
    const key = (globalize ? component.path : component.fullPath);
    map[key] = component;
  }
}



//////////////////////////////
// Given an `indexOrId`, a childOrder and a childMap, return the record for the child.
//////////////////////////////
function getChildFromIndex(idOrIndex, childOrder, childMap) {
  const id = (typeof indexOrId === "number" ? childOrder[indexOrId] : indexOrId);
  return childM
  const childJSON = childMap[id];
  if (!childJSON) {
    console.warn(`getChildFromIndex(): ${parentType} could not find ${childType} ${indexOrId}.`);
    return undefined;
  }
  return childConstructor(childJSON);
}

//////////////////////////////
// Construct a map of templates
//////////////////////////////
function getTemplateMap(templates, pathPrefix) {
  for (let templateId in templates) {

  }
}



class Index {
  constructor(parentPath, json, extraProps) {
    this.data = json;
    // assign "info" properties directly.
    Object.assign(this, this.data.info, extraProps);
    // assign our `path`
    this.path = parentPath + (this.id || "");
  }

  @memoize
  get componentMap() {
    return makeComponentMap(this.components, this.path);
  }

  findComponent(componentId) {
    return this.componentMap[componentId] || this.parent.findComponent(componentId);
  }

  @memoize
  get templateMap() {
    return makeTemplateMap(this.templates);
  }

  findTemplate(templateId) {
    return this.templateMap[templateId] || this.parent.findTemplate(templateId);
  }

}



class ProjectIndex extends Index {

  //////////////////////////////
  // Loader
  //////////////////////////////

  // Create and load project index for the specified project.
  // Returns a promise which resolves with the Project.
  static loadProjectIndex(projectId) {
    return Promise( (resolve, reject) => {
      const url = ProjectIndex.APIUrlForProject(projectId);
      fetch(url).then( (response) => {
        if (response.status !== 200) reject(response.status);
        try {
          const json = response.json();
          const index = new ProjectIndex("/", json.project);
          resolve(index);
        } catch (error) {
          reject(error);
        }
      })
  }

  static APIUrlForProject(projectId) {
    return `/API/getProjectIndex/${projectId}`;
  }

  //////////////////////////////
  // Getters to get bits of data as necessary.
  // NOTE: we cache and munge the data as we unpack it...
  //////////////////////////////

  // Special-case `findComponent()` to look in the theme, and warn if not found.
  findComponent(componentId) {
    const component = this.componentMap[componentId] || this.theme.findComponent(componentId);
    if (component) return component;
    console.warn(`findComponent(${componentId}): component not found.`);
  }

  // Special-case `findTemplate()` to look in the theme, and warn if not found.
  findTemplate(templateId) {
    const template = this.templateMap[templateId] || this.theme.findTemplate(templateId);
    if (template) return template;
    console.warn(`findTemplate(${templateId}): template not found.`);
  }


  @memoize
  get theme() {
    return new ThemeIndex(this.path+"/THEME", this.data.theme);
  }

  @memoize
  get stackMap() {
    const map = {};
    const order = this.stacks;
    for (let id in this.data.stacks) {
      const stackInfo = this.stacks[id];
      const index = order.indexOf(id);
      if (index === -1) console.warn(`${this}.stackMap: stack id ${id} not found stack order list.`);
      map[id] = new StackIndex(this.path+"/", {index, parent:this, project:this});
    }
    return map;
  }

  getInfoForStack(indexOrId) {
    const id = (typeof indexOrId === "number" ? this.stacks[indexOrId] : indexOrId);
    const stack = this.stackMap[id];
    if (!stack) console.warn(`${this.id}.getInfoForStack(${indexOrId}): stack ${id} not found.`);
    return stack;
  }
}


class StackIndex extends _Index {
  @memoize
  get cardMap() {
    const map = {};
    const order = this.cards;
    for (let id in this.data.cards) {
      const cardInfo = this.cards[id];
      const index = order.indexOf(id);
      if (index === -1) console.warn(`${this}.cardMap: card id ${id} not found card order list.`);
      map[id] = new CardIndex(this.path+"/", {index, parent:this, project:this.project, stack:this});
    }
    return map;
  }

  getInfoForCard(indexOrId) {
    const id = (typeof indexOrId === "number" ? this.cards[indexOrId] : indexOrId);
    const card = this.cardMap[id];
    if (!card) console.warn(`${this.id}.getInfoForCard(${indexOrId}): card ${id} not found.`);
    return card;
  }
}

class CardIndex extends _Index {

}

class ThemeIndex extends _Index {

}
