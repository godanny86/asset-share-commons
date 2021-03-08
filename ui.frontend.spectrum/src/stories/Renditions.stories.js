import { html } from 'lit-html';
import '../index';

export default {
    title: 'Example/Rendition'
  };


/**
 * Primary UI component for user interaction
 */
export const Renditions = () => {

  return html`
    <sp-button-group>
        <sp-action-button size="m" href="#" download="Original">Original</sp-action-button>
        <sp-action-button size="m" href="#" download="Original">Web</sp-action-button>
        <sp-action-button size="m" selected>No Download</sp-action-button>
        <sp-action-button size="m" download="Original" disabled>Disabled</sp-action-button>
    </sp-button-group>
  `;
};
