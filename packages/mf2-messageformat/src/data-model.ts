import type { ParseError } from './parser/data-model';
import type {
  Junk,
  Literal,
  PatternElement,
  Placeholder,
  VariableRef
} from './pattern';

/**
 * The representation of a single message.
 * The shape of the message is an implementation detail,
 * and may vary for the same message in different languages.
 *
 * @beta
 */
export type Message = PatternMessage | SelectMessage | JunkMessage;

/**
 * A single message with no variants.
 *
 * @beta
 */
export interface PatternMessage {
  type: 'message';
  declarations: Declaration[];
  pattern: Pattern;
  comment?: string;
  errors?: ParseError[];
}

/**
 * A message may declare any number of local variables or aliases,
 * each with a value defined by a placeholder.
 * The order of the declarations is not relevant,
 * but a valid message may not include a dependency loop amond them.
 *
 * @beta
 */
export interface Declaration {
  target: VariableRef | Junk;
  value: Placeholder | Junk;
}

/**
 * The body of each message is composed of a sequence of parts, some of them
 * fixed (Text), others placeholders for values depending on additional
 * data.
 *
 * @beta
 */
export interface Pattern {
  body: PatternElement[];
}

/**
 * SelectMessage generalises the plural, selectordinal and select
 * argument types of MessageFormat 1.
 * Each case is defined by a key of one or more string identifiers,
 * and selection between them is made according to
 * the values of a corresponding number of placeholders.
 * Selection iterates among the `variants` in order,
 * and terminates when all of the Variant keys match.
 * The result of the selection is always a single Pattern.
 *
 * @beta
 */
export interface SelectMessage {
  type: 'select';
  declarations: Declaration[];
  selectors: PatternElement[];
  variants: Variant[];
  comment?: string;
  errors?: ParseError[];
}

/** @beta */
export interface Variant {
  keys: Array<Literal | CatchallKey>;
  value: Pattern;
}

/**
 * The catch-all key matches all values.
 *
 * @beta
 */
export interface CatchallKey {
  type: '*';
}

/**
 * A type guard for {@link CatchallKey} values
 *
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCatchallKey = (key: any): key is CatchallKey =>
  !!key && typeof key === 'object' && key.type === '*';

/**
 * The result of parsing input that cannot be represented by
 * a {@link PatternMessage} or a {@link SelectMessage}.
 *
 * @beta
 */
export interface JunkMessage {
  type: 'junk';
  declarations: Declaration[];
  source: string;
  comment?: string;
  errors?: ParseError[];
}

/**
 * A type guard for {@link Message} values
 *
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMessage = (msg: any): msg is Message =>
  !!msg &&
  typeof msg === 'object' &&
  (msg.type === 'message' ||
    msg.type === 'select' ||
    (msg.type === 'junk' && msg.declarations));

/**
 * A type guard for {@link PatternMessage} values
 *
 * @beta
 */
export const isPatternMessage = (msg: Message): msg is PatternMessage =>
  msg.type === 'message';

/**
 * A type guard for {@link SelectMessage} values
 *
 * @beta
 */
export const isSelectMessage = (msg: Message): msg is SelectMessage =>
  msg.type === 'select';
