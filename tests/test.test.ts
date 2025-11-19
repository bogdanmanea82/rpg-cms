import { greet } from '../src/test';

describe('greet function', () => {
  it('should greet a person correctly', () => {
    const person = { name: 'Alice', age: 30 };
    const result = greet(person);
    expect(result).toBe('Hello, Alice! You are 30 years old.');
  });

  it('should handle different names and ages', () => {
    const person = { name: 'Bob', age: 25 };
    const result = greet(person);
    expect(result).toContain('Bob');
    expect(result).toContain('25');
  });
});
