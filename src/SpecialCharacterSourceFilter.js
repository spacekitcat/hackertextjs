define('SpecialCharacterSourceFilter', [], () => (character) => {
  const BLANK_CHARACTER = '_';
  let newCharacter = character;

  if (newCharacter === undefined) {
    throw new TypeError('No arguments provided. The character argument must be provided.');
  }

  if (newCharacter === null) {
    throw new TypeError('Invalid argument provided - the character cannot be null.');
  }

  if (newCharacter.match(/[-.|]/g)) {
    newCharacter = BLANK_CHARACTER;
  }

  return newCharacter;
});
