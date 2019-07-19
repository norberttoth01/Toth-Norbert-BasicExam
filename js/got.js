const GameOfThrones = {
  charachters: [],
  init() {
    this.getJson();
  },
  orederByName() {
    this.aliveCharachters.sort((a, b) => a.name.localeCompare(b.name));
  },
  createMap() {
    let str = '';
    for (let i = 0; i<this.aliveCharachters.length; i += 1) {
      str += `<div><img src="/${this.aliveCharachters[i].portrait}"><br>${this.aliveCharachters[i].name}</div>`
    }
    document.querySelector('.map').innerHTML = str;
  },
  getAliveCharachters() {
    this.aliveCharachters = [];
    for (let i = 0; i < this.charachters.length; i += 1) {
      if (!this.charachters[i].dead) {
        this.aliveCharachters.push(this.charachters[i]);
      }
    }
    this.orederByName();
  },
  getData(jsonContent) {
    this.charachters = JSON.parse(jsonContent);
    this.getAliveCharachters();
    this.createMap();
  },
  getJson() {
    const request = new XMLHttpRequest();
    request.onload = () => {
      this.getData(request.responseText);
    };
    request.open('GET', '/json/got.json');
    request.send();
  },
};
GameOfThrones.init();
