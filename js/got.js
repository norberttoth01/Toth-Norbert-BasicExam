const GameOfThrones = {
  charachters: [],
  init() {
    this.selectednode = document.querySelector('[data-id="1"]');
    this.getJson();
    this.nodeDescription = document.querySelector('.data__description');
    this.nodeSearch = document.querySelector('.data__input');
    this.selectednode = document.querySelector('[data-id="1"]');
  },
  animation() {
    this.selectednode.firstChild.classList.add('map__img--selected');
  },
  removeAnimation() {
    this.selectednode.firstChild.classList.remove('map__img--selected');
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
  insertFoundChar(charachter) {
    this.selectednode = document.querySelector(`[data-id="${charachter.id}"]`);
    this.animation();
    this.insertPicture(charachter);
    this.nodeSearch.value = '';
  },
  search() {
    this.removeAnimation();
    this.nodeDescription.innerHTML = '';
    for (let i = 0; i < this.aliveCharachters.length; i += 1) {
      if (this.nodeSearch.value.toLowerCase() === this.aliveCharachters[i].name.toLowerCase()) {
        const charachter = this.aliveCharachters[i];
        this.insertFoundChar(charachter);
        return;
      }
    }
    this.nodeDescription.innerHTML = 'Character is not found!';
    this.nodeSearch.value = '';
  },
  insertBio(charachter) {
    const str = `<div class="data__bio"> ${charachter.bio}</div>`;
    return str;
  },
  insertName(charachter) {
    let str = `<div class="data__name">${charachter.name}</div>`;
    str += this.insertBio(charachter);
    return str;
  },
  insertPicture(charachter) {
    let str = `<img class="data__picture"  alt="${charachter.name}" src="${charachter.picture}">`;
    str += this.insertName(charachter);
    this.nodeDescription.innerHTML += str;
  },
  createDescription(id) {
    this.removeAnimation();
    this.selectednode = document.querySelector(`[data-id="${id}"]`);
    this.animation();
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
      str += `<div data-id="${this.aliveCharachters[i].id}"
       onclick="GameOfThrones.createDescription(${this.aliveCharachters[i].id})"><div>
      <img src="/${this.aliveCharachters[i].portrait}">
      <br>${this.aliveCharachters[i].name}</div></div>`;
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
    this.generateID();
    this.createMap();
    this.selectednode = document.querySelector('[data-id="1"]');
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