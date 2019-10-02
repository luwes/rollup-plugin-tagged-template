import { isIdentifierStart, isIdentifierChar } from './identifier.js';

export function getIdentifiers(code) {
  const re = /\$\{([^}[`'".,\\]+)/g;
  const expressions = [];
  let match;
  while ((match = re.exec(code)) !== null) {
    if (match && isValidIdentifier(match[1])) {
      expressions.push(match[1]);
    }
  }
  return expressions;
}

export function isValidIdentifier(name) {
  return (
    isIdentifierStart(name.charCodeAt(0)) &&
    name
      .split('')
      .slice(1)
      .every((c, i) => isIdentifierChar(name.charCodeAt(i)))
  );
}
