import { LitElement, html, css } from 'lit-element';

class ChatBubble extends LitElement {

  static get properties () {
    return { 
        key: {
            type: String,
        },
        isOwnMessage: { 
            type: Boolean, 
        },
        isSelectable: {
            type: Boolean,
        },
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        value: {
            type: Number,
        },
        link: {
            type: String,
        },
        openNewTab: {
            type: Boolean,
        },
        isEventLink: {
          type: Boolean,
        },
    };
  }

  constructor () {
    super ();
  }

  get isLink () {
      return typeof this.link === "string" && this.link !== "undefined" && this.link.length > 0;
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .message-container {
        width: 80%;
        margin-bottom: 12px;
      }
      .message-container--left {
        margin-right: 20%;
        text-align: left;
      }
      .message-container--right {
        margin-left: 20%;
        text-align: right;
      }
      .message {
        display: inline-block;
        padding: 8px;
        border-radius: 12px;
        background-color: #F0F0F0;
        
        font-family: 'Roboto', sans-serif;
        text-align: left;
        font-weight: 400;
        font-size: .9rem;
        color: #363636;

        hyphens: auto;
        word-break: break-all;
        /* Non standard for WebKit */
        word-break: break-word;
        white-space: pre-wrap;
      }
      .message--left {
        border-bottom-left-radius: 0;
      }
      .message--right {
        border-bottom-right-radius: 0;
        background-color: #03A678;
        color: #FFF;
      }
      .message--selectable {
        cursor: pointer;
        text-decoration: underline;
        position: static;
        user-select: none;
      }
    
      .message--selectable-clear {
        display: inline-block;
        margin-left: 12px;
        width: 17px;
        height: 17px;
        
        cursor: pointer;
        text-align: center;
        line-height: 17px;
        color: #FFF;
        font-size: 12px;
        user-select: none;

        background-color: #9c9c9c;
        border-radius: 50%;
      }
      .message--selectable-clear:hover {
        color: #9c9c9c;
        background-color: #e4e4e4;
      }

      .message--button {
        padding: 12px;
        background-color: #03A678;
        cursor: pointer;
      }
      .message--button:hover {
        opacity: 0.8;
      }
      .message-button {
        text-decoration: none;
        color: #FFF;
        font-weight: 700;
        padding-right: 28px;
        background-repeat: no-repeat;
        background-position: right;
      }
      .message-button--external {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 511.997 511.997' style='fill: currentcolor' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(1 1)'%3E%3Cpath fill='white' d='m211.26 389.24-60.331 60.331c-25.012 25.012-65.517 25.012-90.508 5e-3 -24.996-24.996-24.996-65.505-5e-3 -90.496l120.68-120.68c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0s8.331-21.839 0-30.17c-41.654-41.654-109.18-41.654-150.83 0l-120.68 120.68c-41.654 41.654-41.654 109.18 0 150.83 41.649 41.676 109.18 41.676 150.85 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171 1e-3z'/%3E%3Cpath fill='white' d='m479.75 30.24c-41.654-41.654-109.2-41.654-150.85 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17s21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491l-132.74 132.74c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.18 41.654 150.83 0l132.74-132.74c41.654-41.654 41.654-109.18 0-150.83z'/%3E%3C/g%3E%3C/svg%3E%0A");
      }
      .message-button--internal {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 426.667 426.667' version='1.1' viewBox='0 0 426.67 426.67' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='170.67 309.33 298.67 213.33 170.67 117.33'/%3E%3Cpath fill='white' d='m213.33 0c-117.87 0-213.33 95.467-213.33 213.33s95.467 213.33 213.33 213.33 213.33-95.466 213.33-213.33-95.467-213.33-213.33-213.33zm0 384c-94.08 0-170.67-76.587-170.67-170.67s76.587-170.67 170.67-170.67 170.67 76.586 170.67 170.67-76.587 170.67-170.67 170.67z'/%3E%3C/svg%3E");
      }
    `;
  }
  
  messageSelected () {
    if (!this.isSelectable) {
        return;
    }
    this.value++;
    if (this.value > this.max) {
        this.value = this.max;
    }
    if (this.value < this.min) {
        this.value = this.min;
    }
    this.requestUpdate ();
    this.valueChanged (this.value);
  }

  messageSelectionCleared () {
    this.value = this.min - 1;
    this.messageSelected ();
  }

  valueChanged (value, isUserMessage = false) {
    if (this.previousValue === value) {
        return;
    }
    this.previousValue = value;
    const event = new CustomEvent('message-changed', {
        detail: {
            value: value,
            min: this.min,
            max: this.max,
            key: this.key == "undefined" ? undefined : this.key,
            isUserMessage,
            isOwnMessage: this.isOwnMessage != undefined,
            isSelectable: this.isSelectable != undefined,
        },
        bubbles: true, 
        composed: true,
    });
    this.dispatchEvent(event);
  }

  buttonClicked (e) {
    if (this.isEventLink != true) {
      return;
    }
    e.preventDefault ();
    const event = new CustomEvent('message-clicked', {
      detail: {
          value: this.value,
          key: this.key == "undefined" ? undefined : this.key,
          isOwnMessage: this.isOwnMessage != undefined,
      },
      bubbles: true, 
      composed: true,
    });
    this.dispatchEvent(event);
  }

  firstUpdated() {
    // Set correct default values
    this.max = this.max ? this.max : 5;
    this.min = this.min ? this.min : 0;
    this.value = this.value < this.min ? this.min : this.value;
    this.value = this.value > this.max ? this.max : this.value;
    this.isEventLink = this.isEventLink == true;
    this.previousValue = null;
    
    if (this.isOwnMessage == true) {
        this.valueChanged (this.shadowRoot.querySelector ("slot").assignedNodes()[0].textContent, true);
    }
  }

  render () {
    let template = null;
    if (this.isLink) {
        if (this.openNewTab) {
            template = html`<a 
                type="button"
                href="${this.link}"
                target="_blank"
                class="message-button message-button--external"
                @click="${this.buttonClicked}"
            ><slot></slot></a>`;
        } else {
            template = html`<a 
                type="button"
                href="${this.link}"
                class="message-button message-button--internal"
                @click="${this.buttonClicked}"
            ><slot></slot></a>`;
        }
    } else {
        template = html`<span 
            class="${this.isSelectable ? " message--selectable" : ""}"
            @click="${this.messageSelected}"
        ><slot></slot>${
            this.isSelectable ? html` (${this.value}x)`: null
        }</span>${ this.isSelectable && this.value > this.min ? html`<span
            class="message--selectable-clear"
            @click="${this.messageSelectionCleared}"
        >x</span>`: null}`;
    }

    return html`
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">

        <div class="message-container message-container--${this.isOwnMessage ? "right" : "left"}">
            <div 
                class="message message--${this.isOwnMessage ? "right" : "left"}${this.isLink ? " message--button" : ""}"
            >${template}</div>
        </div>
    `;
  }

}

customElements.define('tanglemesh-chatbubble', ChatBubble);
