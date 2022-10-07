const formTemplate = document.createElement("template");
formTemplate.innerHTML = `
    <form>
        <h2>Add Person</h2>
        <section>
        </section>
        <input type="submit"/>
        <span id="result"></span>
    </form>
`;

const employeeFormLables = [
  'name',
  'email',
  'phone',
  'department_id',
  null,
];

class EmployeeForm extends HTMLElement {
  constructor({ fields }) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
    this.form = this.shadowRoot.querySelector("form");
    this.inputs = this.form.querySelector("section");
    this.form.setAttribute('enctype','multipart/form-data');
    this.result = this.form.querySelector("#result");
    
    fields.forEach((element,index) => {
      const input = document.createElement("input");
      input.setAttribute("type", element.fieldType);
      input.setAttribute("name", element.fieldName);
      input.setAttribute('placeholder',employeeFormLables[index]);

      if(index == 4){
        input.setAttribute('accept','image/*');

      }

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
    let newFile = null;

    const body = {};

    values.forEach((element,index) => {
      const key = element.name;
      const value = element.value;

      if(index == 4 && element.files.length > 0){
        const file = element.files[0];
        const blob = file.slice(0,file.size,'image/jpg');
        const fileName = self.crypto.randomUUID();
        newFile = new File([blob], fileName+".jpg", {type:"image/jpg"});

        body[key] = fileName;

      }else{
        body[key] = value;
      }
    });

    console.log(body);

    if(newFile != null){
      const data = new FormData();
      data.append('file', newFile);

      const imgResponse = await fetch('/api/img',{
        method: "POST",
        body: data,
      })
    }

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
