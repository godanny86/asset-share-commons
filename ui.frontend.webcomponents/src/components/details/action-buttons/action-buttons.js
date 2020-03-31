import { LitElement, html, property } from 'lit-element';
import '@spectrum-web-components/button';


class ActionButtons extends LitElement {
 
  /*
  static get properties() {
    return { label: { type: String } ,
              downloadLabel: { type: String},
              addToCartLabel: { type: String}
            };
  }

  constructor() {
    super();
    this.label = '';
    this.downloadLabel = '';
    this.addToCartLabel = '';
  }*/
  @label


  render() {
    return html`
      <h4>${this.label}</h4>
      <sp-button variant="cta">${this.downloadLabel}</sp-button>
      <sp-button variant="primary">${this.addToCartLabel}</sp-button>
    `;
  }
}

customElements.define('asc-action-buttons', ActionButtons)