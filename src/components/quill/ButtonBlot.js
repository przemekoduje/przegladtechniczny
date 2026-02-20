import Quill from 'quill';
const Inline = Quill.import('blots/inline');

class ButtonBlot extends Inline {
  static create(value) {
    const node = super.create();

    // Obsługa klasy CSS
    if (value.class) {
      node.setAttribute('class', value.class);
    } else {
      node.setAttribute('class', 'quill-button'); // domyślna klasa
    }

    // Obsługa onclick
    if (value.onclick) {
      node.setAttribute('onclick', value.onclick);
    }

    // Treść przycisku
    node.innerText = value.label ;

    return node;
  }

  static value(node) {
    return {
      class: node.getAttribute('class'),
      onclick: node.getAttribute('onclick'),
      label: node.innerText,
    };
  }
}

ButtonBlot.blotName = 'button';
ButtonBlot.tagName = 'button';

export default ButtonBlot;
