# fair-principles

[![fair-principles on npm](https://img.shields.io/npm/v/fair-principles.svg)](https://www.npmjs.com/package/fair-principles)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/curvenote/fair-principles/blob/main/LICENSE)
![CI](https://github.com/curvenote/fair-principles/workflows/CI/badge.svg)

A tiny utility to show [FAIR Principles](https://www.go-fair.org/fair-principles/) in your application. Used under the CC-BY License from [GO FAIR](https://www.go-fair.org/fair-principles/).

```shell
npm install fair-principles
```

The library has **no dependencies**, however it works well with `chalk`!

```typescript
import chalk from 'chalk';
import { formatPrinciples } from 'fair-principles';

console.log(formatPrinciples('*', { chalk }));
```

![](/images/all-principles.png)

## formatPrinciples

Formats the list of FAIR principles with a title.

- `formatPrinciples()` - format all principles
- `formatPrinciples('*', { chalk, showTitle: false })` - format all principles with a chalk logger and without the title
- `formatPrinciples('A*')` - format all "Accessible" principles
- `formatPrinciples(['A*', 'F'])` - formats the "Findable" principle (no children) and then all "Accessible" principles

```typescript
import chalk from 'chalk';
import { formatPrinciples } from 'fair-principles';

console.log(formatPrinciples('A*', { chalk }));
```

## formatPrinciple

Formats a single FAIR principle, possibly with a header.

- `formatPrinciple('R')` - format the "Reusable" principle, including the header
- `formatPrinciple('R', { showHeader: false })` - format the "Reusable" principle, without the header
- `formatPrinciple('R1_1')` - Show the the "Reusable" sub-principle.

```typescript
import chalk from 'chalk';
import { formatPrinciples } from 'fair-principles';

console.log(formatPrinciples('A*', { chalk }));
```

## highlightFAIR

Highlights the word FAIR with a specific color, for example with an underline or in red (the default).

```typescript
import chalk from 'chalk';
import { highlightFAIR } from 'fair-principles';

highlightFAIR(ordered.join(''), { color: chalk.underline });
```

## Format Options

All format calls can take `chalk` as an argument, this will apply defaults. You can also specify:

- `indent`: (`boolean`): Indent sub-principles (for example `A1_1`), default is `true`
- `showTitle`: (`boolean`): Shows the title "FAIR Principles"
- `showHeader`: (`boolean`): Show a header like "Accessible" before the "A" principle
- `title`: (`Formatter`): A color formatter for the title
- `header`: (`Formatter`): A color formatter for the header
- `enumerator`: (`Formatter`): A color formatter for the enumerator (e.g. `A1`)
