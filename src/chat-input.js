import { LitElement, html, css } from 'lit-element';

class ChatInput extends LitElement {

  static get properties () {
    return { 
      disabled: {
        type: Boolean,
      },
      message: { 
        type: String 
      },
      isOwnMessage: { 
        type: Boolean 
      },
      placeholder: { 
        type: String 
      },
    };
  }

  constructor () {
    super ();
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .message-input {
          display: block;
          border: 0px;
          width: 100%;
          height: 40px;

          resize: none;
          overflow: hidden;

          padding: 12px;
          
          font-family: 'Roboto', sans-serif;
          border-radius: 4px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          line-height: 16px;

          transition: height .2s ease-in-out;
      }
      
    `;
  }

  submitMessage (message) {
    let event = new CustomEvent('submit', {
        detail: {
            message,
        },
        bubbles: true, 
        composed: true,
    });
    this.dispatchEvent(event);
  }

  messageInput (e) {
    // Read input value
    const $messageInput = this.shadowRoot.getElementById('message-input');
      
    // submit message, if key is enter
    if (e.keyCode === 13 && e.shiftKey === false) { // ENTER
        this.submitMessage ($messageInput.value.slice (0, -1));
        $messageInput.value = "";
    }
    // Detect line count and set height of text-area
    const lineCount = $messageInput.value.split ("\n").length;
    $messageInput.style.height = 24 + (lineCount * 16) + "px";
  }
  
  render () {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">

      <textarea 
        ?disabled="${this.disabled}"
        id="message-input"
        class="message-input"
        @keyup="${this.messageInput}"
        placeholder="${this.placeholder}"
      ></textarea>
    `;
  }

}

customElements.define('tanglemesh-chatinput', ChatInput);
