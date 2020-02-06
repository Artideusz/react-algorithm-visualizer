function* binarySearchGen(obj, value) {
    let arr = obj.array.sort((a,b)=>a.value-b.value);
    let left = 0;
    let right = arr.length-1;
    while(left < right) {
        let middlePtr = Math.floor((left + right) / 2);
        if(arr[middlePtr]['value'] < value) {
            left = middlePtr+1;
        } else if (arr[middlePtr]['value'] > value) {
            right = middlePtr-1;
        } else {
            return {
                ...obj,
                array: arr,
                activeIndexes: [middlePtr]
            }
        }
        yield {
            ...obj,
            array: arr,
            activeIndexes: [middlePtr, left, right]
        }
    }
    return {
        ...obj,
        activeIndexes: []
    }
}

function* linearSearchGen(obj, value) {
    for(let i = 0; i < obj.array.length; i++) {
        console.log(obj.array[i]['value'], value, i);
        if(obj.array[i]['value'] === value) {

            return {
                ...obj,
                activeIndexes: [i]
            }
        }
        yield {
            ...obj,
            activeIndexes: [i]
        }
    }
    return {
        ...obj,
        activeIndexes: []
    }
}

const linear_search = {
    id: 0,
    name: 'Linear Search',
    type: 'search',
    generator: linearSearchGen,
    description: 'Linear Search is the easiest searching algorithm to learn, and its good for unsorted arrays. It works by looping through all elements in an array and finding the value the program is looking for. Time Complexity of Linear Search is O(n).',
    descriptionCode: 
    `function linearSearch(array, value) {
        for(let i = 0; i < array.length; i++) { // Loop though all values in the array
            if(array[i] === value) { // If value exists
                return i; // Return the found value
            }
        }
        return -1; // Value has not been found
    }`
}

const binary_search = {
    id: 1,
    name: 'Binary Search',
    type: 'search',
    generator: binarySearchGen,
    description: 'Binary Search searches for the value only in a sorted array by halving the array until the value has been found. Time Complexity of Binary Search is O(log n)',
    descriptionCode: 
    `function binarySearch(array, value) {
        const arr = array.sort((a,b)=>a-b) // OPTIONAL: The array must be sorted for the search to work
        let left = 0;
        let right = array.length - 1;
        while(left < right) {
            const middlePtr = Math.floor((left + right) / 2);
            if(arr[middlePtr] < value) { 
                left = middlePtr + 1; // The value is on the right side of the array
            } else if(arr[middlePtr] > value) {
                right = middlePtr - 1; // The value is on the left side of the array
            } else { //The value is equal array[middlePtr]
                return middlePtr; // Value has been found
            }
        }
        return -1; // Value has not been found
    }`
}

const Search = [
    linear_search,
    binary_search
]

export default Search;