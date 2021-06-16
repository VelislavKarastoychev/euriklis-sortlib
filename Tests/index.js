'use strict'
const message = require('@euriklis/message')
const testSortLibConstructor = require('./TestSortLibConstructor')
const testAddElementInSortedArray = require('./TestAddElementInSortedArray')
const testMergeSort = require('./TestMergeSort')
const testQuickSort = require('./TestQuickSort')
const testBubbleSort = require('./TestBubbleSort')
const testHeapSort = require('./TestHeapSort')
const testInsertionSort = require('./TestInsertionSort')
const testSelectionSort = require('./TestSelectionSort')
const testVersion = require('./TestVersion')
const testSortMethod = require('./TestSortMethod')
const testCocktailSort = require('./TestCocktailSort')
const testBucketSort = require('./TestBucketSort')
const testComparison = require('./ComparisonSortlibAndSort')
const testFindBestElements = require('./TestFindBestElements')
const testFindWorstElements = require('./TestFindWorstElements')
const testSortObjectArray = require('./TestSortObjectArray')
const testFindBestForObjectArray = require('./TestFindBestForObjectArray')
const testFindWorstForObjectArray = require('./TestFindWorstForObjectArray')
const testGenerateRandomArray = require('./TestGenerateRandomArray')
const tested_method = (name) => {
    return new message().bold().italic().underline()
        .set_color_yellow().append("Euriklis testing message:\n")
        .reset().set_color_green().append_check_mark().append_white_space()
        .set_color_cyan().append(`Successfully tested ${name} method or property of the SortLib instance.`)
        .reset().log()
}

async function testing() {
    try {
        const test1 = await testSortLibConstructor()
        const addElementInSortedArray = await testAddElementInSortedArray()
        const mergeSort = await testMergeSort()
        const quickSort = await testQuickSort()
        const bubbleSort = await testBubbleSort()
        const heapSort = await testHeapSort()
        const insertionSort = await testInsertionSort()
        const selectionSort = await testSelectionSort()
        const version = await testVersion()
        const sortMethod = await testSortMethod()
        const cocktailSort = await testCocktailSort()
        const bucketSort = await testBucketSort()
        const comparison = await testComparison()
        const findBestElements = await testFindBestElements()
        const findWorstElements = await testFindWorstElements()
        const sortObjectArray = await testSortObjectArray()
        const findBestForObjectArray = await testFindBestForObjectArray()
        const findWorstForObjectArray = await testFindWorstForObjectArray()
        const generateRandomArray = await testGenerateRandomArray()
        tested_method('Constructor')
        tested_method(addElementInSortedArray)
        tested_method(mergeSort)
        tested_method(quickSort)
        tested_method(bubbleSort)
        tested_method(heapSort)
        tested_method(insertionSort)
        tested_method(selectionSort)
        tested_method(sortMethod)
        tested_method(cocktailSort)
        tested_method(bucketSort)
        tested_method(comparison)
        tested_method(findBestElements)
        tested_method(findWorstElements)
        tested_method(sortObjectArray)
        tested_method(findBestForObjectArray)
        tested_method(findWorstForObjectArray)
        tested_method(generateRandomArray)
    } catch (err) {
        throw new Error(err)
    }
}
// call the tests
testing()