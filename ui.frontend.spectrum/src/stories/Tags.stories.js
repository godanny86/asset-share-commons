import { html } from 'lit-html';
import '../index';

export default {
    title: 'Example/Tags' 
  };


/**
 * Primary UI component for user interaction
 */
export const Tags = () => {

  return html`
    <h1> Example Tags </h1>
    <br />
    <sp-tags>
      <sp-tag>Tag 1</sp-tag>
      <sp-tag invalid>Tag 2</sp-tag>
      <sp-tag disabled>Tag 3</sp-tag>
  </sp-tags>
  `;
};
