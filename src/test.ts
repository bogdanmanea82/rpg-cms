// This file tests our TypeScript configuration

interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const bogdan: Person = {
  name: "Bogdan",
  age: 43
};

console.log(greet(bogdan));

// Try uncommenting these to see TypeScript catch errors:
// const invalid = greet({ name: "Test" });  // Missing 'age' property
// const wrongType = greet("Not an object");  // Wrong type entirely
// const nullProblem: string = null;  // strictNullChecks catches this

export { Person, greet };
