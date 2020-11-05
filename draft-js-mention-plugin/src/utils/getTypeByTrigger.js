const getTypeByTrigger = (trigger) =>
  trigger === '@' ? 'mention' : `${trigger}mention`;

export const getTypesByTrigger = (trigger) =>
  [...trigger, ''].map(trigger => `${trigger}mention`);

export default getTypeByTrigger;
