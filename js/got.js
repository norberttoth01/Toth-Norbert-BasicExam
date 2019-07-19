const GameOfThrones = {
  charachters: [],
  init() {
    this.getJson();
    this.nodeDescription = document.querySelector('.data__description');
  },
  generateID() {
    for (let i = 0; i < this.aliveCharachters.length; i += 1) {
      this.aliveCharachters[i].id = i + 1;
    }
  },
  findCharachter(id) {
    let charachter;
    for (let i = 0; i < this.charachters.length; i += 1) {
      if (id === this.charachters[i].id) {
        charachter = this.charachters[i];
      }
    }
    return charachter;
  },
  insertPicture(charachter) {
    const str = `<img class="data__picture" src="${charachter.picture}">`;
    this.nodeDescription.innerHTML += str;
  },
  createDescription(id) {
    this.nodeDescription.innerHTML = '';
    const charachter = this.findCharachter(id);
    this.insertPicture(charachter);
  },
  orederByName() {
    this.aliveCharachters.sort((a, b) => a.name.localeCompare(b.name));
  },
  createMap() {
    let str = '';
    for (let i = 0; i < this.aliveCharachters.length; i += 1) {
      str += `<div data-id="${this.aliveCharachters.id}
      " onclick="GameOfThrones.createDescription(${this.aliveCharachters[i].id})">
      <img src="/${this.aliveCharachters[i].portrait}">
      <br>${this.aliveCharachters[i].name}</div>`;
    }
    document.querySelector('.map').innerHTML = str;
    console.log(document.querySelector('Jon Snow'));
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
    this.generateID();
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