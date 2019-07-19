const GameOfThrones = {
  charachters: [],
  init() {
    this.getJson();
  },
  getAliveCharachters() {
    this.aliveCharachters = [];
    for (let i = 0; i < this.charachters.length; i += 1) {
      if (!this.charachters[i].dead) {
        this.aliveCharachters.push(this.charachters[i]);
      }
    }
    console.log(this.aliveCharachters);
  },
  getData(jsonContent) {
    this.charachters = JSON.parse(jsonContent);
    this.getAliveCharachters();
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