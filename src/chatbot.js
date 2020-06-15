import { LitElement, html, css, unsafeCSS } from 'lit-element';

import "./chat-bubble";
import "./chat-input";

class Chatbot extends LitElement {

  static get properties () {
    return { 
      disabled: {
        type: Boolean,
      },
      title: { 
        type: String 
      },
      avatar: {
        type: String
      },
      messages: {
        type: Array,
      },
      inputPlaceholder: {
        type: String,
      },
      maxHeight: {
        type: String,
      },
    };
  }

  constructor () {
    super ();
    this.messages = [];
  }

  firstUpdated () {
    this.updateScrollPosition ();
  }

  static get styles() {
    return css`
      :host, 
      article {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
      }
      * {
        box-sizing: border-box;
      }
      article {
        border-radius: 4px;
        font-family: 'Roboto', sans-serif;
        border: 1px solid #ececec;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
      }
      header {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ececec;
        flex: 0 1 auto;
      }
      .title {
        display: inline-block;
        font-weight: 500;
        color: #363636;
        font-size: .8rem;
        margin: 0;
        padding: 0;
      }
      .avatar {
        display: inline-block;
        border-radius: 50%;
        height: 50px;
        width: 50px;
        object-fit: cover;
        margin-right: 12px;
        vertical-align: middle;
      }
      .messages-container {
        scroll-behavior: smooth;
        padding: 12px;
        overflow: auto;
        max-height: 80vh;
        flex: 1 1 auto;
      }
      .input-container {
        border-top: 1px solid #ececec;
        flex: 0 1 auto;
      }
    `;
  }

  newMessage (content, isOwnMessage = true) {
    this.messages.push ({
      isOwnMessage,
      content,
    });
    this.requestUpdate();
    this.updateScrollPosition ();
  }
  
  messageInputSubmit (e) {
    this.newMessage (e.detail.message);
  }

  updateScrollPosition () {
    const $messageContainer = this.shadowRoot.querySelector (".messages-container");
    setTimeout (() => {
      $messageContainer.scrollTop = $messageContainer.scrollHeight;
    }, 10);
  }

  render () {
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">

      <article
        style="max-height: ${this.maxHeight || "80vh"};"
      >
        ${ this.title ? html`
          <header>
            ${ this.avatar ? html`
              <img src="${this.avatar}" class="avatar" alt="${this.title}" />
            ` : null }
            <h2 class="title">${this.title}</h2>
          </header>
        ` : null }
        <div 
          id="messages-container"
          class="messages-container" 
        >
          ${
            this.messages.map (message => html`
              <tanglemesh-chatbubble 
                ?isOwnMessage=${message.isOwnMessage}
                ?isSelectable=${message.isSelectable}
                min=${message.min}
                max=${message.max}
                value=${message.value}
                key=${message.key}
                link=${message.link}
                ?openNewTab=${message.openNewTab}
                ?isEventLink=${message.isEventLink}
              >${message.content}</tanglemesh-chatbubble>
            `)
          }
        </div>
        <div class="input-container">
          <tanglemesh-chatinput
            @submit="${this.messageInputSubmit}"
            ?disabled="${this.disabled}"
            placeholder="${this.inputPlaceholder}"
          ></tanglemesh-chatinput>
        </div>
      </article>
    `;
  }

}

customElements.define('tanglemesh-chatbot', Chatbot);
