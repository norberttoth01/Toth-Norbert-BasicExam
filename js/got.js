const GameOfThrones = {
  init() {
    const charachters = [];
    this.getJson();
  },
  getData(jsonContent) {
    this.charachters = JSON.parse(jsonContent);
    console.log(this.charachters);
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
