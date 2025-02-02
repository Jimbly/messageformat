import {
  Declaration,
  isPatternMessage,
  isSelectMessage,
  JunkMessage,
  Message,
  Pattern
} from '../data-model';
import { MessageFormat } from '../messageformat';
import { isValidNmtoken } from '../parser/names';
import {
  Expression,
  isLiteral,
  isPlaceholder,
  isText,
  isVariableRef,
  Junk,
  Literal,
  MarkupEnd,
  MarkupStart,
  Option,
  PatternElement,
  VariableRef
} from '../pattern';

/**
 * Stringify a message using its syntax representation.
 *
 * @beta
 */
export function stringifyMessage(msg: Message | MessageFormat) {
  if (msg instanceof MessageFormat) msg = msg.resolvedOptions().message;
  let res = '';
  for (const decl of msg.declarations) res += stringifyDeclaration(decl);
  if (isPatternMessage(msg)) {
    res += stringifyPattern(msg.pattern);
  } else if (isSelectMessage(msg)) {
    res += 'match';
    for (const sel of msg.selectors) res += ' ' + stringifyPlaceholder(sel);
    for (const { keys, value } of msg.variants) {
      res += '\nwhen ';
      for (const key of keys) {
        res += (isLiteral(key) ? stringifyLiteral(key) : '*') + ' ';
      }
      res += stringifyPattern(value);
    }
  } else {
    res += msg.source.trim();
  }
  return res;
}

function stringifyDeclaration({ target, value }: Declaration) {
  const targetStr = isVariableRef(target)
    ? stringifyVariableRef(target)
    : stringifyJunk(target);
  const valueStr = isPlaceholder(value)
    ? stringifyPlaceholder(value)
    : stringifyJunk(value);
  return `let ${targetStr} = ${valueStr}\n`;
}

function stringifyExpression({ name, operand, options }: Expression) {
  let res: string;
  if (isLiteral(operand)) {
    res = stringifyLiteral(operand) + ' ';
  } else if (isVariableRef(operand)) {
    res = stringifyVariableRef(operand) + ' ';
  } else {
    res = '';
  }
  res += `:${name}`;
  if (options) for (const opt of options) res += ' ' + stringifyOption(opt);
  return res;
}

function stringifyJunk(junk: Junk | JunkMessage) {
  return junk.source.trim();
}

function stringifyLiteral(lit: Literal) {
  if (lit.type === 'nmtoken' && isValidNmtoken(lit.value)) {
    return lit.value;
  }

  const esc = lit.value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
  return `(${esc})`;
}

function stringifyMarkupEnd(end: MarkupEnd) {
  return `-${end.name}`;
}

function stringifyMarkupStart({ name, options }: MarkupStart) {
  let res = `+${name}`;
  if (options) for (const opt of options) res += ' ' + stringifyOption(opt);
  return res;
}

function stringifyOption(opt: Option) {
  const valueStr = isVariableRef(opt.value)
    ? stringifyVariableRef(opt.value)
    : stringifyLiteral(opt.value);
  return `${opt.name}=${valueStr}`;
}

function stringifyPattern({ body }: Pattern) {
  let res = '';
  for (const el of body) {
    res += isText(el) ? el.value : stringifyPlaceholder(el);
  }
  return `{${res}}`;
}

function stringifyPlaceholder(ph: PatternElement) {
  const body = isPlaceholder(ph) ? ph.body : ph;
  let res: string;
  switch (body.type) {
    case 'expression':
      res = stringifyExpression(body);
      break;
    case 'junk':
      res = stringifyJunk(body);
      break;
    case 'literal':
      res = stringifyLiteral(body);
      break;
    case 'markup-end':
      res = stringifyMarkupEnd(body);
      break;
    case 'markup-start':
      res = stringifyMarkupStart(body);
      break;
    case 'variable':
      res = stringifyVariableRef(body);
      break;
    default:
      res = ''; // bad placeholder
  }
  return `{${res}}`;
}

function stringifyVariableRef(ref: VariableRef) {
  return '$' + ref.name;
}
