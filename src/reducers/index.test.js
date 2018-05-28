import rootReducer from './index';

it('returns an object with icinga and graphite keys', () => {
  const state = rootReducer(undefined, {});

  expect(state).toHaveProperty('icinga');
  expect(state).toHaveProperty('graphite');
});
