# EditableLabel

A simple React component for switching between a text label and a text input.

  
Clicking on the text label switches the label to a text input. A loss of focus on the text input will switch back to the text label and save the text changes.

  

An `ESC` key press will switch from text input back to label and discard any changes made to the text in the input.

  

An `ENTER` key press will switch from text input back to label and save any changes made.

  

When a save is triggered, the `save` function passed in as a prop is called with the current value of the input.

  

##  [Live Demo](https://agitated-kirch-67aca5.netlify.app/)

  

## Table of Contents

  

*  [Installation](#installation)

*  [Usage](#usage)

  

## Installation

  

`$ npm install label-editable-react`

`$ yarn add label-editable-react`

  

## Usage

The `EditableLabel` object requires two props:

  

-  `initialValue` which is the initial text to display

-  `save` which is the function called when the text is updated.

  

Optional props:

  

-  `labelClass` which is added to the `className` of the label `<span>` tag.

-  `inputClass` which is added to the `className` of the text `<input>` tag.

-  `disableKeys` which disables the keyPress handler.

-  `inputType`: which is added to the `type` of the text `<input>` tag | `default`: **text**.

-  `heading`: which is added above of label | `default`: **' '**.

-  `isWebsite`: if label is website set it to **true** | `default` : **false**.

-  `isEditIcon`: No need of pencil icon set it to **false** | `default` : **true**.

  

Example:
### [Demo Repository](https://github.com/Mustafamemon/demo-app/blob/master/src/DemoPages/editable-label.js)
  
###   [Original Repository](https://github.com/Mustafamemon/editable-label)

**Note** : Do Install [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction#examples) for better UI