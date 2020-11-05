import { Modifier, EditorState } from 'draft-js';
import getSearchText from '../utils/getSearchText';
import getTypeByTrigger from '../utils/getTypeByTrigger';

const addMention = (
  editorState,
  mention,
  mentionPrefix,
  mentionTrigger,
  entityMutability
) => {
  const currentSelectionState = editorState.getSelection();
  const { begin, end, triggerSymbol } = getSearchText(
    editorState,
    currentSelectionState,
    mentionTrigger
  );

  const contentStateWithEntity = editorState
    .getCurrentContent()
    .createEntity(getTypeByTrigger(triggerSymbol), entityMutability, {
      mention,
    });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();


  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `${mentionPrefix}${mention.name}`,
    null, // no inline style needed
    entityKey
  );

  // If the mention is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState
    .getCurrentContent()
    .getBlockForKey(blockKey)
    .getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-mention'
  );
  return EditorState.forceSelection(
    newEditorState,
    mentionReplacedContent.getSelectionAfter()
  );
};

export default addMention;
