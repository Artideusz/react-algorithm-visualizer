function random256(){
    return Math.floor(Math.random()*255+1);
}

function getId(id) {
    return document.getElementById(id);
}

function rgb(r=random256(), g=random256(), b=random256()){
    return {
        red: r,
        green: g,
        blue: b,
        brightness: r+g+b,
        rgb: `rgb(${r},${g},${b})`
    }
}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxElementValue(elements) {
    return Math.max(...elements.map(v => v.value));
}

function singleElementWidth(elements, width) {
    return (1/elements.length)*width;
}

function swap(elements, i1, i2) {
    [elements[i1], elements[i2]] = [elements[i2], elements[i1]];
}

export {
    random256,
    randomRange,
    getId,
    maxElementValue,
    singleElementWidth,
    rgb,
    swap
}