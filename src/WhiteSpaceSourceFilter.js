define('WhiteSpaceSourceFilter', [], () => {
  const TAB_SIZE = 8;
  const SPACE_SUBST = '_';

  function getTab() {
    let expandedTab = SPACE_SUBST;
    for (let i = 0; i < TAB_SIZE - 1; i += 1) {
      expandedTab += SPACE_SUBST;
    }

    return expandedTab;
  }

  function tabExpand(character) {
    return character.replace(/\t/g, getTab());
  }

  function spaceReplace(character) {
    return character.replace(/ /g, SPACE_SUBST);
  }

  function replace(character) {
    let filteredCharacter = tabExpand(character);
    filteredCharacter = spaceReplace(filteredCharacter);

    return filteredCharacter;
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
