import chalk from 'chalk';
import { highlightFAIR, formatPrinciples, createPrincipleUrl, formatPrinciple } from '../src';

// Log the principles!
console.log(formatPrinciples('*', { chalk }));

describe('FAIR Principles for Node', () => {
  test('highlightFAIR', () => {
    expect(highlightFAIR('A', { color: (l) => `_${l}_` })).toBe('F_A_IR');
  });
  test('highlightFAIR with chalk', () => {
    expect(highlightFAIR('A', { chalk })).toBe(`F${chalk.red('A')}IR`);
  });
  test('formatPrinciples', () => {
    const snippet = 'protocol is open'; // This is in A1_1
    expect(formatPrinciples('*').includes(snippet)).toBe(true);
    expect(formatPrinciples('A*').includes(snippet)).toBe(true);
    expect(formatPrinciples('A1_1').includes(snippet)).toBe(true);
    expect(formatPrinciples('A1').includes(snippet)).toBe(false);
    expect(formatPrinciples('A').includes(snippet)).toBe(false);
    expect(formatPrinciples('F*').includes(snippet)).toBe(false);
  });
  test('formatPrinciple', () => {
    const snippet = 'protocol is open'; // This is in A1_1
    expect(() => formatPrinciple('*' as any)).toThrow();
    expect(formatPrinciple('A1_1').includes(snippet)).toBe(true);
    expect(formatPrinciple('A1').includes(snippet)).toBe(false);
    expect(formatPrinciple('A').includes(snippet)).toBe(false);
    expect(formatPrinciple('F').includes(snippet)).toBe(false);
  });
  test('points to URLs', () => {
    expect(createPrincipleUrl()).toBe('https://www.go-fair.org/fair-principles/');
    expect(createPrincipleUrl('F')).toBe('https://www.go-fair.org/fair-principles/f');
    expect(createPrincipleUrl('A1_1')).toBe('https://www.go-fair.org/fair-principles/a1-1');
    // Can't go to URLs that don't exist
    expect(() => createPrincipleUrl('A1_5' as any)).toThrow();
  });
});
