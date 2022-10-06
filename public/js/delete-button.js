const deleteTemplate = document.createElement('template');
deleteTemplate.innerHTML = `
    <button>Delete</button>
`;

class DeleteButton extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(deleteTemplate.content.cloneNode(true));
    }
}

window.customElements.define('delete-button', DeleteButton);