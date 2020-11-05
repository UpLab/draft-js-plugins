import React, { Component } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from 'draft-js-mention-plugin';
import createSingleLinePlugin from 'draft-js-single-line-plugin';
import editorStyles from './editorStyles.css';
import mentions from './mentions';

const mentionPlugin = createMentionPlugin({ mentionTrigger: ['@', '#'] });

const singleLinePlugin = createSingleLinePlugin({
  stripEntities: false,
});

const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin, singleLinePlugin];
const json = { blocks: [{ key: '3fp65', text: 'Matthew Russell  sf Matthew Russell input 1  input2 ', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [{ offset: 0, length: 15, key: 0 }, { offset: 20, length: 15, key: 1 }, { offset: 36, length: 7, key: 2 }, { offset: 45, length: 6, key: 3 }], data: {} }], entityMap: { 0: { type: 'mention', mutability: 'IMMUTABLE', data: { mention: { name: 'Matthew Russell' } } }, 1: { type: 'mention', mutability: 'IMMUTABLE', data: { mention: { name: 'Matthew Russell' } } }, 2: { type: '@,#mention', mutability: 'IMMUTABLE', data: { mention: { name: 'input 1' } } }, 3: { type: '@,#mention', mutability: 'IMMUTABLE', data: { mention: { name: 'input2' } } } } };

export default class SimpleMentionEditor11 extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(json)),
    // editorState: EditorState.createWithContent(ContentState.createFromText('Type a " @" to insert an input field')),

    suggestions: mentions,
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}
