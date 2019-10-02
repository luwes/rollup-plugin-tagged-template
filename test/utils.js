const assert = require('assert');
const { getIdentifiers } = require('../src/utils.js');

describe('getIdentifiers', () => {
  it('should get the identifiers from the template expressions', () => {
    assert.deepEqual(
      getIdentifiers("Hello ${name}, how is your ${animal['type']}?"),
      ['name', 'animal']
    );

    assert.deepEqual(
      getIdentifiers("${video.delivery} ${ಠ_ಠ} ${Ꙭൽↈⴱ.yo}"),
      ['video', 'ಠ_ಠ', 'Ꙭൽↈⴱ']
    );
  });

  it('should ignore invalid identifiers', () => {
    assert.deepEqual(
      getIdentifiers('${\'dontgetme\'} ${`no`} ${"nee"} ${[false]} ${0}'),
      []
    );
  });
});
