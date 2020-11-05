const getTypesByTrigger = (trigger) =>
  trigger.map(trigger => `${trigger}mention`);

const findMentionEntities = trigger => (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      getTypesByTrigger(trigger).includes(contentState.getEntity(entityKey).getType())
    );
  }, callback);
};

export default findMentionEntities;
