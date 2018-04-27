define('ToUpperCaseSourceFilter', [], () => (character) => {
  if (character === undefined) {
    throw new TypeError('No arguments provided. The character argument must be provided.');
  }

  if (character === null) {
    throw new TypeError('Invalid argument provided - the character cannot be null.');
  }

  return character.toUpperCase();
});
