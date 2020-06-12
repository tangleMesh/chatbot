# Chatbot

This is a simple chat-widget webcomponent. You can define initial messages and receive messages from a user.

## Installation

Simply install this webcomponent via npm:

    npm install --save @tanglemesh/chatbot

## Usage

In order to use this chatbot after npm package installation you only have to import the bundled file:

    <tanglemesh-chatbot 
        title="Example chatbot"
    ></tanglemesh-chatbot>

    <script src="bundle.js"></script>
    <!-- Only for browser-compatibility -->
    <script src="webcomponents-loader.js"></script> 

## Configuration

The chatbot-component (`<tanglemesh-chatbot />`) is configurable with the following attributes:

* `disabled`: disabled the user's input-field so the client is not able to write any new messages
* `title`: the title of the chatbot. If skipped, there is simply no header for the chatbot
* `avatar`: a link to the avatar to be shown. `title` is required, otherwise the avatar will not be shown!
* `messages`: an array of initial messages to be shown to the user (more below)
* `inputPlaceholder`: a string that will be shown in the input-field if no text entered by the user
* `maxHeight`: the maximum height of the messages container. Defaults to `80vh`

## Messages

There are different formats of messages: *text-messages*, *selection-messages* and *link-messages*.

### Text messages

The simplest form of messages are the text-messages. To define a new text-message you can simply pass an object with the following attribtues:

    {
        key: "optional identifier",
        isOwnMessage: true, // is this a client or server message
        content: "The actual message to be shown",
    }

### Selection messages

A selection message is a text messages that can be selected even multiple times, depending on your configuration:

    {
        key: "optional identifier",
        isOwnMessage: true, // is this a client or server message
        content: "The actual message to be shown",
        isSelectable: true, // configures this message as a selection-message
        min: 0, // the minimum of selections for this message
        max: 5, // the maximum of selections for this message
        value: 1, // the actual selections
    }

The selection messages will have a slightly different styling with an indicator how often this message has been selected.

### Link messages

A link messages provides you the functionality to link to an internal or external page:

    {
        key: "optional identifier",
        isOwnMessage: true, // is this a client or server message
        content: "The actual message to be shown",
        link: "https://google.com/", // the link the user get's redirected to
        openNewTab: true, // if the user should open this page in a new tab (external) or not (internal)
        isEventLink: true, // if this is a native link (`isEventLink=false`) or if only a event should be fired once the button has clicked (event-name: click)
    }

## Events

There exists two events that informs you about any interaction the user has made with your chatbot:

    <tanglemesh-chatbot 
        title="Example chatbot"
        id="firstChatbot"
    ></tanglemesh-chatbot>

    <script>
        document.addEventListener ("DOMContentLoaded", () => {
            document.getElementById ("firstChatbot").addEventListener ("change", (e) => {
                console.log ("CHANGE", e.detail);
            });
            document.getElementById ("firstChatbot").addEventListener ("click", (e) => {
                console.log ("CHANGE", e.detail);
            });
        });
    </script>

The `change` event will inform you about new user messages or interactions with your selection messages. The `click` event informs you about a link-button (`isEventLink: true`) beeing clicked. The `event.detail` property will provide you with the available information about the user interaction:

### Selection message

    {
        isOwnMessage: true
        isSelectable: true
        isUserMessage: false
        key: "some identifier"
        max: 2
        min: 0
        value: 1
    }

### New user message

    {
        isOwnMessage: true
        isSelectable: false
        isUserMessage: true
        key: undefined
        max: 5
        min: 0
        value: "test"
    }

### Link message

    {
        isOwnMessage: true,
        key: "identifier-for-link,
    }