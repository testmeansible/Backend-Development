let score = "33";

// console.log(typeof score);

let valueInNumber = Number(score);

// console.log(typeof valueInNumber);

// console.log(valueInNumber);

let loggedin = true;
let loggedinNumber = Number(loggedin);
// console.log(typeof loggedinNumber);
// console.log(loggedinNumber);

// =============================Operations===========================
// let value = 3;
// let negValue = -value;
// console.log(negValue);

// console.log(2+2);
// console.log(2-2);
// console.log(2*2);
// console.log(2**3);   //power
// console.log(3%2);   //modulus
// console.log(3/2);    //division   3/2 = 1.5

// console.log(10%3);

// let str1 = "hello";
// let str2 = "world";
// console.log(str1+str2);  //concatenation of two strings

// primitive and non primitive data types

// primitives: (Stack Memory)
// call by value
// primitive: number, string, boolean, undefined, null, symbol, BigInt

// non primitives: (Heap Memory)

// By Reference
// non primitive: objects, arrays, functions  


// Statically typed languages require the type of a 
// variable to be known at compile time, while dynamically 
// typed languages determine the type of a variable at runtime.

// JavaScript, Python, Ruby, Perl, etc are examples of dynamically 
// typed languages.


// const score = 100;
// const scoreValue = score + 1;
// console.log(scoreValue);

// const loggedin = true;

let userEmail;
// console.log(loggedinValue);

const id = Symbol("123");

const andotherId = Symbol("123");
// console.log(anotherId);
console.log(id == andotherId);

const bigNumber = 1234567890123456789012345678901234567890n;


// in stack we got the copy of the original value therefore in 
// order to change the value only the copy is changed and the 
// original value is not changed.
// prmititve

let myName1 = "John Doe";
let myName2 = myName1;

myName2 = "John Doe 2";	

// console.log(myName2);

// in heap we got a reference to the location where the data is stored 
// therefore whenever we made a change to the value the original 
// value is changed unlike the primitive data types

// non primitive


let user1 = {
    email : "5d0lD@example.com",
    upi : "user@ybl"    
}



let user2 = user1


user2.email = "alpha@g.com";

console.log(user1.email);
console.log(user2.email);