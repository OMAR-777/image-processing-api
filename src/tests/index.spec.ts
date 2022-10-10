import myFunc from '../app';

describe('Dummy test:', () => {
  it('expect myFunc(5) to equal 25', () => {
    expect(myFunc(5)).toEqual(25);
  });
});
