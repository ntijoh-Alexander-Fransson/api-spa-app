const popupTemplate = document.createElement("template");
popupTemplate.innerHTML = `
    <dialog open="true">
        <button>close</button>
        <p>hjelp</p>
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

    this.shadowRoot.querySelector("p").textContent = JSON.stringify(json);
  };

  close = () => {
    this.remove();
  };
}

window.customElements.define("employee-popup", EmployeePopup);
