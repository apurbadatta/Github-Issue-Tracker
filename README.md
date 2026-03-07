1. What is the difference between var, let, and const?
answer:
var =>
1.Function scoped (not block scoped)
2.Can be re-declared
3.Can be updated

let =>
1.Block scoped
2.Cannot be re-declared in same scope
3.Can be updated

const=>
1.Block scoped
2.Cannot be re-declared
3.Cannot be updated

2. What is the spread operator (...)?
answer:
It spreads array elements individually.
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); 
// [1, 2, 3]

Spread in Objects
const user = { name: "Apurba", age: 20 };
const newUser = { ...user, city: "Rangpur" };
console.log(newUser);
output: {
  name: "Apurba",
  age: 20,
  city: "Rangpur"
}

3. What is the difference between map(), filter(), and forEach()?
answer:
1.map() creates a new array by transforming each element.
Example
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
// [2, 4, 6, 8]

2.filter() creates a new array with elements that pass a condition.
Example
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(num => num % 2 === 0);
console.log(even);
// [2, 4]

3.forEach() just loops through the array and does something with each element.
Example
const numbers = [1, 2, 3];
numbers.forEach(num => {
  console.log(num);
});
output: 1 2 3

4. What is an arrow function?
annswer: 
An Arrow Function is a shorter way to write a function in JavaScript.
1.Normal Function
function add(a, b) {
  return a + b;
}
2.const add = (a, b) => a + b;

5. What are template literals?
answer:
Template Literals are a feature in JavaScript (ES6) used to create strings more easily using backticks ( ) instead of quotes.
example (i):
const name = "Apurba";
const message = `Hello ${name}`;
console.log(message);
example (ii):
const name = "Apurba";
const card = `
<div class="card">
  <h2>${name}</h2>
</div>
`;
