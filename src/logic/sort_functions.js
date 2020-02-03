
function* partRun(elements, algoObject, order=(a)=>a){
    let generator = algoObject.generator(elements, order);
    let result;
    do {
        result = generator.next();
        yield result.value;
    } while(!result.done);
    return result.value;
}

function fullRun(elements, algoObject, order=(a)=>a){
    let generator = algoObject.generator(elements, order);
    let result;
    do {
        result = generator.next();
    } while(!result.done)
    return result.value;
}

function scramble(elements){
    let newArr = [...elements];
    function rand(max){
        return Math.floor(Math.random()*max);
    }
    for(let i = 0; i < elements.length; i++) {
        let rand1 = rand(elements.length);
        let rand2 = rand(elements.length);
        [newArr[rand1], newArr[rand2]] = [newArr[rand2], newArr[rand1]];
    }
    return newArr;
}

export {
    partRun,
    fullRun,
    scramble
}