type Formatter = (text: string) => string;
type ChalkLike = Formatter & {
  bold: ChalkLike;
  red: ChalkLike;
  blue: ChalkLike;
  cyan: ChalkLike;
  underline: ChalkLike;
  greenBright: ChalkLike;
};

function format(text: string) {
  return text;
}

export const highlightFAIR = (letter: string, opts?: { chalk?: ChalkLike; color?: Formatter }) => {
  const l = letter.toLowerCase();
  const color = opts?.color ?? opts?.chalk?.red ?? format;
  return [
    l.includes('f') ? color('F') : 'F',
    l.includes('a') ? color('A') : 'A',
    l.includes('i') ? color('I') : 'I',
    l.includes('r') ? color('R') : 'R',
  ].join('');
};

export const principleNames = {
  F: 'Findable',
  A: 'Accessible',
  I: 'Interoperable',
  R: 'Reusable',
};

export const principles = {
  F: 'The first step in (re)using data is to find them. Metadata and data should be easy to find for both humans and computers. Machine-readable metadata are essential for automatic discovery of datasets and services, so this is an essential component of the FAIRification process.',
  F1: '(Meta)data are assigned a globally unique and persistent identifier',
  F2: 'Data are described with rich metadata (defined by R1 below)',
  F3: 'Metadata clearly and explicitly include the identifier of the data they describe',
  F4: '(Meta)data are registered or indexed in a searchable resource',
  A: 'Once the user finds the required data, she/he/they need to know how they can be accessed, possibly including authentication and authorisation.',
  A1: '(Meta)data are retrievable by their identifier using a standardised communications protocol',
  A1_1: 'The protocol is open, free, and universally implementable',
  A1_2: 'The protocol allows for an authentication and authorisation procedure, where necessary',
  A2: 'Metadata are accessible, even when the data are no longer available',
  I: 'The data usually need to be integrated with other data. In addition, the data need to interoperate with applications or workflows for analysis, storage, and processing.',
  I1: '(Meta)data use a formal, accessible, shared, and broadly applicable language for knowledge representation.',
  I2: '(Meta)data use vocabularies that follow FAIR principles',
  I3: '(Meta)data include qualified references to other (meta)data',
  R: 'The ultimate goal of FAIR is to optimise the reuse of data. To achieve this, metadata and data should be well-described so that they can be replicated and/or combined in different settings.',
  R1: '(Meta)data are richly described with a plurality of accurate and relevant attributes',
  R1_1: '(Meta)data are released with a clear and accessible data usage license',
  R1_2: '(Meta)data are associated with detailed provenance',
  R1_3: '(Meta)data meet domain-relevant community standards',
};

export type Principle = keyof typeof principles;
export type PrincipleName = 'F' | 'A' | 'I' | 'R';
export type PrincipleLookup = Principle | '*' | 'F*' | 'A*' | 'I*' | 'R*';

const principleKeys = Object.keys(principles) as Principle[];

export type FormatOptions = {
  chalk?: ChalkLike;
  title?: Formatter;
  header?: Formatter;
  enumerator?: Formatter;
  indent?: boolean;
  showTitle?: boolean;
  showHeader?: boolean;
};

const mustExist = 'Principle does not exist, try "A1_1"';

export function formatPrinciple(principle: Principle, opts?: FormatOptions): string {
  if (!(principle in principles)) throw new Error(mustExist);
  const key = principle.replace(/_/g, '.');
  const header = principleNames[principle as PrincipleName];
  const colorHeader = opts?.header ?? opts?.chalk?.bold.cyan ?? format;
  const underline = opts?.chalk?.underline ?? format;
  const enumerator = opts?.enumerator ?? opts?.chalk?.bold.blue ?? format;
  if (header && opts?.showHeader !== false) {
    return [
      colorHeader(`${underline(header.slice(0, 1))}${header.slice(1)}`),
      principles[principle],
    ].join('\n');
  }
  const indent = principle.includes('_') && opts?.indent !== false;
  return `${indent ? '  ' : ''}${enumerator(key)} ${principles[principle]}`;
}

export function formatPrinciples(
  keys: PrincipleLookup | PrincipleLookup[] = '*',
  opts?: FormatOptions,
): string {
  const input = typeof keys === 'string' ? [keys] : keys;
  const ordered = principleKeys.filter(
    (key) =>
      input.includes('*') ||
      input.includes(key) ||
      input.includes((key.slice(0, 1) + '*') as PrincipleLookup),
  );
  const colorTitle = opts?.title ?? opts?.chalk?.bold.greenBright ?? format;
  const underline = opts?.chalk?.underline ?? format;
  if (opts?.showTitle === false) return ordered.map((k) => formatPrinciple(k, opts)).join('\n');
  const header = `${colorTitle(
    `${highlightFAIR(ordered.join(''), { color: underline })} Principle${
      ordered.length > 1 ? 's' : ''
    }`,
  )}:`;
  return [header, ...ordered.map((k) => formatPrinciple(k, opts))].join('\n');
}

const baseUrl = 'https://www.go-fair.org/fair-principles/';

export function createPrincipleUrl(principle?: Principle) {
  if (!principle) return baseUrl;
  if (!(principle in principles)) throw new Error(mustExist);
  return `${baseUrl}${principle.toLowerCase().replace(/_/g, '-')}`;
}
