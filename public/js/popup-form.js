const popupFormLables = [
    'img',
    'name',
    'email',
    'phone',
    'department_id'
];

const popupTypes =[
    'file',
    'text',
    'email',
    'tel',
    'number'
]

const popupFormTemplate = document.createElement('template');
popupFormTemplate.innerHTML = `
    <form>
        <section>
        <strong>Update</strong>
        <br>
        </section>
        <input type="submit"/>
    </form>
`;

class PopupForm extends HTMLElement {
    constructor({fields}){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(popupFormTemplate.content.cloneNode(true));
        this.fields = fields;

        this.inputSection = this.shadowRoot.querySelector('section');

        for (let i = 1; i < fields.length; i++) {

            const section = this.inputSection;

            const br1 = document.createElement('br');
            section.appendChild(br1);

            const lable = document.createElement('lable');
            lable.innerText = popupFormLables[i - 1];
            lable.setAttribute('for',popupFormLables[i - 1]);
            section.appendChild(lable);

            const br2 = document.createElement('br');
            section.appendChild(br2);

            const input = document.createElement('input');
            input.setAttribute('type',popupTypes[i - 1]);
            input.setAttribute('value', fields[i]);
            input.setAttribute('name', popupFormLables[i - 1]);
            input.setAttribute('id', popupFormLables[i - 1]);
            section.appendChild(input);

        }

        this.form = this.shadowRoot.querySelector('form');
        this.form.setAttribute('enctype','multipart/form-data')

        this.form.onsubmit = this.updateUser;

    }

    updateUser = async (e) => {
        e.preventDefault();

        const updatedValues = this.shadowRoot.querySelectorAll('input');
        const requestBody = {};
        let fileHolder = null;

        console.log(updatedValues);

        updatedValues.forEach((element,index) => {
            if(index == 0 && element.files.length > 0){
                requestBody[element.name] = element.files[0].name.split('.')[0];
                fileHolder = element.files[0];
            }else{
                requestBody[element.name] = element.value;
            }
        });

        if(fileHolder != null){
            const imgFile = new FormData();
            imgFile.append('file', fileHolder);

            const imgResponse = await fetch('/api/img',{
                method: 'POST',
                body: imgFile
            });

            console.log(imgResponse);
        }
    
        const response = await fetch('/api/employees/'+this.fields[0],{
            method: "PATCH",
            body: JSON.stringify(requestBody)
        });

        console.log(response);
        this.parentNode.parentNode.remove();

        index();
    }
}

window.customElements.define('popup-form', PopupForm);

