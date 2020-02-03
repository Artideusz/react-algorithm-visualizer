import { swap } from '../util.js';
import React from 'react';
// Sorting algorithms must return the array and the active index of the loop

function* bubbleSortGen(obj, type=a=>a){
    if(!obj) throw new Error('No array passed to sorting generator');
    let arr = [...obj.array];
    let size = arr.length;
    do{
        let isSwapped = false;
        for(let i = 0; i < size - 1; i++) {
            yield {
                ...obj,
                array: arr,
                activeIndexes: [i]
            };
            if(0 < type(arr[i]) - type(arr[i+1])){
                isSwapped = true;
                swap(arr, i, i+1);
            }
        }
        if(!isSwapped) break;
        size-=1;
    } while(size > 1);

    return {
        ...obj,
        array: arr,
        activeIndexes: []
    };
}

function* selectionSortGen(obj, type=a=>a) {
    if(!obj) throw new Error('No array passed to sorting generator');
    let arr = [...obj.array];
    let size = arr.length;
    for(let i = 0 ; i < size-1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < size; j++) {
            yield {
                ...obj,
                array: arr,
                activeIndexes: [minIndex, j]
            }
            if(0 < type(arr[minIndex]) - type(arr[j])) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
    return {
        ...obj,
        array: arr,
        activeIndexes: []
    };
}

function* countingSortGen(obj, type=a=>a) {
    if(!obj) throw new Error('No array passed to sorting generator');
    // Convert array type to make it easier to count
    let convArr = obj.array.map(v=>Math.floor(type(v)));
    let size = convArr.length; // 7 [i = 6] 
    let max = Math.max(...convArr); // 5
    let count = Array(max+1).fill(0); // [0, 0, 0, 0, 0, 0]
    let output = [...obj.array];
    for(let i = 0; i < max+1; i++) {
        count[convArr[i]]++;
    } // [0, 2, 2, 1, 1, 1]
    for(let j = 1; j < max+1; j++) {
        count[j]+=count[j-1];
    } // [0, 2, 4, 5, 6, 7]
    for(let k = 0; k < size; k++) {
        yield {
            ...obj,
            array: output,
            activeIndexes: [k, size]
        }

        output[count[convArr[k]]-1] = obj.array[k];
        count[convArr[k]]--;
    } // [1, 1, 2, 2, 3, 4, 5]
    return {
        ...obj,
        array: output,
        activeIndexes: []
    }
}

const bubble_sort = {
    id: 0,
    name: 'Bubble Sort',
    generator: bubbleSortGen,
    description: (<div>Bubble Sort is the simplest sorting algorithm and it works by comparing and swapping neighbouring elements when they are in the wrong order. The time complexity of bubble sort is O(n<sup>2</sup>).</div>),
    descriptionCode: 
    `function bubbleSort(array) {
        let resArr = [...array]; // Creates a copy of the original array
        for(let i = 0; i < resArr.length; i++) {
            for(let j = 0; j < resArr.length - i - 1; j++) { // Last element is sorted
                if(resArr[j] > resArr[j+1]) { // If element is bigger than the next element
                    [resArr[j], resArr[j+1]] = [resArr[j+1], resArr[j]]; // Swap them
                }
            }
        }
        return resArr; // Sorted array
    }`
}

const selection_sort = {
    id: 1,
    name: 'Selection Sort',
    generator: selectionSortGen,
    description: (<div>Selection Sort sorts an array by repeatedly finding the minimum value and swapping it with the first unsorted value. The time complexity of Selection Sort is O(n<sup>2</sup>).</div>),
    descriptionCode: 
    `function selectionSort(array) {
        let resArr = [...array]; // Creates a copy of the array
        for(let i = 0; i < resArr.length-1; i++) {
            let minIndex = i; // The index of the minimum value of an element
            for(let j = i+1; j < resArr.length; j++) { //Iterate through all elements from i+1 to the end (i is the minimum index)
                if(resArr[j] < resArr[minIndex]) {
                    minIndex = j; // Set j to be the index of min value
                }
            }
            if(minIndex !== i) { // If the min index has changed
                [resArr[minIndex], resArr[i]] = [resArr[i], resArr[minIndex]]; // Swap element[i] with element with the minimum index
            }
        }
        return resArr; // Sorted Array
    }`
}

const counting_sort = {
    id: 2,
    name: 'Counting Sort',
    generator: countingSortGen,
    description: (<div>Counting Sort sort an array by counting the number of occurrences of each number in the array. Time Complexity of Counting Sort is O(n+k).</div>),
    descriptionCode:
    `function countingSort(array) {
        let size = array.length; // Length of the array
        let max = Math.max(...array); // Max value for creating the counting array
        let count = Array(max+1).fill(0); // Max+1 <- We are also including zero for counting
        let output = Array(size); // The array we want to fill with sorted elements
        for(let i = 0; i <= max; i++) { // We are iterating through all values in unsorted array and adding one for each occurence.
            count[array[i]]++; 
        }
        for(let j = 1; j <= max; j++) { // We are summing up the occurences so we get an ascending array [0,1,0,2,1,0] to [0,1,1,3,4,4]
            count[j]+=count[j-1];
        }
        for(let k = 0; k < size; k++) { // Iterating through all elements and placing them into their place
            output[count[array[k]]-1] = array[k];
            count[array[k]]--;
        }
        return output; // Sorted Array
    }`
}

const Sorts = [
    bubble_sort,
    selection_sort,
    counting_sort
]

export default Sorts;