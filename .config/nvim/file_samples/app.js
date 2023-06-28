// get sum of integers in array
function getSum(array) {
    return array.reduce((a, b) => a + b);
}

function findByName(array, name) {
    return array.find((item) => item.name === name);
}

// flatten array
function flatten(array) {
    return array.reduce((a, b) => a.concat(Array.isArray(b)));
}
