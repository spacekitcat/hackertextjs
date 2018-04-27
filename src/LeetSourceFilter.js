define('LeetSourceFilter', [], () => {
  const conversionTable = new Map();
  conversionTable.set('a', '4');
  conversionTable.set('A', '4');
  conversionTable.set('l', '1');
  conversionTable.set('L', '1');
  conversionTable.set('t', '7');
  conversionTable.set('T', '7');
  conversionTable.set('s', '5');
  conversionTable.set('S', '5');
  conversionTable.set('o', '0');
  conversionTable.set('O', '0');
  conversionTable.set('e', '3');
  conversionTable.set('E', '3');

  function replace(character) {
    let newCharacter = character;

    if (conversionTable.has(character)) {
      newCharacter = conversionTable.get(character);
    }

    return newCharacter;
  }

  return (character) => {
    if (character === undefined) {
      throw new TypeError('No arguments provided. The character argument must be provided.');
    }

    if (character === null) {
      throw new TypeError('Invalid argument provided - the character cannot be null.');
    }

    return replace(character);
  };
});
