import mut from './module.js';

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});


test('Testing div -- success', () => {
  const expected = 5;
  const got = mut.div(10, 2);
  expect(got).toBe(expected);
});

test('Testing div -- divide by 0 should be Infinity', () => {
  const got = mut.div(5, 0);
  expect(got).toBe(Infinity);
});

test('Testing div -- negative numbers', () => {
  const expected = -2;
  const got = mut.div(10, -5);
  expect(got).toBe(expected);
});

test('containsNumbers -- string with numbers', () => {
  const got = mut.containsNumbers('abc123');
  expect(got).toBe(true);
});

test('containsNumbers -- string with no numbers', () => {
  const got = mut.containsNumbers('abcdef');
  expect(got).toBe(false);
});

//this testcase should catch the bug, returning false
test('containsNumbers -- string with spaces or symbols only', () => {
  const got = mut.containsNumbers('   ');
  expect(got).toBe(false); 
});
