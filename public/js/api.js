async function index() {
  const response = await fetch("/api/employees");
  const json = await response.json();

  const employeeSection = document.querySelector("#employees");
  employeeSection.innerHTML = "";

  json.forEach((employee) => {
    employeeSection.appendChild(new EmployeeCard(employee));
  });

}

async function add() {
  const response = await fetch("/api/employees/new");
  const resJson = await response.json();

  const fields = resJson.formFields.map((field) => {
    return {
      fieldName: Object.keys(field)[0],
      fieldType: Object.values(field)[0],
    };
  });
  
  document
    .querySelector("#add-employee")
    .appendChild(new EmployeeForm({ fields }));
}

function deleteCard(){
  document.querySelector('main').addEventListener('click', async (e) => {
    if(e.composedPath()[2].tagName == 'DELETE-BUTTON'){
      const response = await fetch('/api/employees/'+e.target.id, {
        method: 'DELETE'
      });
      
      if(response.status > 199 && response.status < 300){
        e.target.remove();
      }else{
        alert('error code: '+response.status);
      }
    }
  })
}
