const view = document.getElementById('view');
// const jQuery = require('jQuery')
// const express = require('express')
// const app = express();

interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
    document.body.style.paddingTop = `${headerHeight}px`;
});

class Scene {
    constructor() {
        console.log('in scene constructor')
        this.action = new Action(this)
        this.action.setCallbacks()
        return this
    }
    continue(pageNumber) {
        console.log('continue callback')
        var filename = '/page' + pageNumber + '.html';
        console.log(pageNumber)
        var htmltext = `<p>hrllo</p>`;
        var client = new XMLHttpRequest();
        client.open('GET', filename)
        client.onreadystatechange = function() {
            console.log("HELP ME")
            console.log(client.responseText);
            htmltext = client.responseText;
            view.innerHTML = htmltext;
        }
        client.send();
    }
}
console.log('did something')
scene = new Scene();



