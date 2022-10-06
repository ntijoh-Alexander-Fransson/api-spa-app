const template = document.createElement("template");

template.innerHTML = `
    <style>
        .employee.card {
            display: flex;
            gap: 10px;
        }
        img {
            object-fit: contain;
        }
    </style>
    <div class='employee card' data-id=''>
        <img src=''>
        <section>
            <h1 class='name'>
                <slot name='name'></slot>
            </h1>
            <p class='email'>
                <slot name='email'><slot/>
            </p>
            <p class='phone'>
                <slot name='phone'><slot/>
            </p>
            <p class='department_id'>
                <slot name='department_id'><slot/>
            </p>
            <button>edit</button>
            <delete-button></delete-button>
        </section>
    </div>
`;
template.classList.add("employee-card");

class EmployeeCard extends HTMLElement {
  constructor(employee) {
    super();

    const { department_id, email, id, name, img, phone } = employee;

    this.id = id;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.img = this.shadowRoot.querySelector("img");
    this.img.src = `/img/${img}.jpg`;

    this.card = this.shadowRoot.querySelector("div.employee.card");

    this.name = this.card.querySelector(".name");
    this.email = this.card.querySelector(".email");
    this.phone = this.card.querySelector(".phone");
    this.dpt = this.card.querySelector(".department_id");

    this.name.textContent = name;
    this.email.textContent = email;
    this.phone.textContent = phone;
    this.dpt.textContent = department_id;

    this.card.setAttribute("data-id", id);

    this.card.querySelector("button").onclick = this.showDialog;
  }

  showDialog = () => {
    const dialogContainer = document.querySelector("#dialog");

    dialogContainer.appendChild(new EmployeePopup(this.id));
  };
}

window.customElements.define("employee-card", EmployeeCard);
