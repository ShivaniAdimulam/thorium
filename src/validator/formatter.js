const greeting = '   Hello world!   ';

console.log(greeting.trim());
// expected output: "Hello world!";



const sentence = 'The quick brown fox jumps over the lazy dog.';

console.log(sentence.toLowerCase());
// expected output: "the quick brown fox jumps over the lazy dog."



const sentence2 = 'The quick brown fox jumps over the lazy dog.';

console.log(sentence2.toUpperCase());
// expected output: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."

module.exports = {greeting,sentence,sentence2}