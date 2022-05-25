function add(a, b) {
	return a + b;
}
console.log(add(2, 3));

function sum() {
	let sum = 0;
	for (let i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}

function sum2(...args) {
	let sum = 0;
	for (let i = 0; i < args.length; i++) {
		sum += args[i];
	}
	return sum;
}

// don't forget to return
// strings are immutable so we need to have a new variable to save the result from the method toLowerCase. This method converts the string into a new one that consists only of lowercase letters and returns its value
// it means that the old original string is not changed or affected in any way
function stringIncludes(string1, string2) {
	let temporaryString = string1.toLowerCase();
	return temporaryString.includes(string2.toLowerCase());
}
