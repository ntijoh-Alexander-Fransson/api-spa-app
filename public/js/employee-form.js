const formTemplate = document.createElement("template");
formTemplate.innerHTML = `
    <form>
        <section>
        
        </section>
        <input type="submit"/>
        <span id="result"></span>
    </form>
`;

class EmployeeForm extends HTMLElement {
  constructor({ fields }) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
    this.form = this.shadowRoot.querySelector("form");
    this.inputs = this.form.querySelector("section");

    this.result = this.form.querySelector("#result");

    fields.forEach((element) => {
      const input = document.createElement("input");
      input.setAttribute("type", element.fieldType);
      input.setAttribute("name", element.fieldName);

      this.inputs.appendChild(input);
    });

    this.form.onsubmit = this.handleSubmit;
  }

  reset = () => {
    const inputs = this.inputs.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const values = this.inputs.querySelectorAll("input");

    const body = {};

    values.forEach((element) => {
      const key = element.name;
      const value = element.value;

      body[key] = value;
    });

    console.log(body);
    const response = await fetch("/api/employees", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const json = await response.json();

    this.result.textContent = json.result;

    this.reset();
    index();
  };
}

window.customElements.define("employee-form", EmployeeForm);
