const popupTemplate = document.createElement("template");
popupTemplate.innerHTML = `
    <style>
      dialog{
        display: flex;
        justify-content: end;
      }
    </style>
    <dialog open="true">
        <button>X</button>
        <section>
        </section>
    </dialog>
`;

class EmployeePopup extends HTMLElement {
  constructor(emplyeeId) {
    super();

    this.employeeId = emplyeeId;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(popupTemplate.content.cloneNode(true));

    this.populate();

    this.shadowRoot.querySelector("button").onclick = this.remove.bind(this);
  }

  populate = async () => {
    const response = await fetch(`/api/employees/${this.employeeId}`);
    const json = await response.json();

    const fields = Object.values(json);
    this.shadowRoot.querySelector('section').appendChild(new PopupForm({fields}));
    
  };

  close = () => {
    this.remove();
  };
}

window.customElements.define("employee-popup", EmployeePopup);
