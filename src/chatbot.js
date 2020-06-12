import { LitElement, html, css } from 'lit-element';

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
      }
    };
  }

  constructor () {
    super ();
    this.messages = [
      {
        isOwnMessage: true,
        content: "Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message Some own message",
      },
      {
        isOwnMessage: false,
        content: "Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message Some other message",
      },
      {
        isOwnMessage: false,
        content: "UX Designer",
        isSelectable: true,
        min: 0,
        max: 2,
        value: 0,
        key: "des_ux"
      },
      {
        isOwnMessage: false,
        content: "Web developer",
        isSelectable: true,
        min: 1,
        max: 5,
        value: 0,
        key: "web_dev"
      },
      {
        link: "https://google.com",
        content: "Weiter zum Formular",
        openNewTab: true,
      },
      {
        link: "https://google.com",
        content: "Weiter zum Formular",
        openNewTab: false,
      },
    ];
  }

  static get styles() {
    // $color-dark:           #363636;
    // $color-light:          #FFFFFF;
    // $color-background:     #fafafa;
    // $color-primary-dark:   #387368;
    // $color-primary:        #03A678;
    // $color-primary-light:  #65A688;
    // $color-secondary:      #D99789;
    // $color-secondary-dark: #D98982;
    return css`
      * {
        box-sizing: border-box;
      }
      article {
        border-radius: 4px;
        box-shadow: 1px 1px 4px #d2d2d2;
        font-family: 'Roboto', sans-serif;

      }
      header {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ececec;
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
        padding: 12px;
      }
      .input-container {
        border-top: 1px solid #ececec;
      }
    `;
  }

  newMessage (content, isOwnMessage = true) {
    this.messages.push ({
      isOwnMessage,
      content,
    });
    this.requestUpdate();
  }
  
  messageInputSubmit (e) {
    this.newMessage (e.detail.message);
  }

  render () {
    // Components needed:

    // 1. Text-Box (raw-text, loading, icons) [sender, receiver]
    // 2. Text-Input
    // 3. Text-Selection (Single text-box that should be selectable [even multipletimes])
    return html`
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">

      <article>
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
              >${message.content}</tanglemesh-chatbubble>
            `)
          }
        </div>
        <div class="input-container">
          <tanglemesh-chatinput
            @submit="${this.messageInputSubmit}"
            ?disabled="${this.disabled}"
          ></tanglemesh-chatinput>
        </div>
      </article>
    `;
  }

}

customElements.define('tanglemesh-chatbot', Chatbot);
