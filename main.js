window.addEventListener("beforeunload", save);

let accountsTableBody = document.querySelector("#accounts-table-body");
let allLinks = document.querySelectorAll(".nav-link");
let views = document.querySelectorAll(".view");
let idInuput = document.querySelector('[placeholder = "id"]');
let nameInuput = document.querySelector('[placeholder = "name"]');
let lastNameInuput = document.querySelector('[placeholder = "last name"]');
let emailInuput = document.querySelector('[placeholder = "email"]');
let phoneInuput = document.querySelector('[placeholder = "phone"]');
let saveBtn = document.querySelector("#save");
let eId = document.querySelector(".eId");
let eName = document.querySelector(".eName");
let eLastName = document.querySelector(".eLastName");
let eEmail = document.querySelector(".eEmail");
let ePhone = document.querySelector(".ePhone");
let editBtn = document.querySelector("#edit");
let id;

editBtn.addEventListener("click", saveEditedAccount);
saveBtn.addEventListener("click", saveAccount);

function saveEditedAccount() {
  const editedAccount = {
    id: eId.value,
    name: eName.value,
    lastName: eLastName.value,
    email: eEmail.value,
    phone: ePhone.value,
  };

  db[id] = editedAccount;
  createAccountsTable();
  showView("#accounts-view");
}

function saveAccount() {
  const newAccount = {
    id: idInuput.value,
    name: nameInuput.value,
    lastName: lastNameInuput.value,
    email: emailInuput.value,
    phone: phoneInuput.value,
  };
  db.push(newAccount);
  idInuput.value = "";
  nameInuput.value = "";
  lastNameInuput.value = "";
  emailInuput.value = "";
  phoneInuput.value = "";
  createAccountsTable();
  showView("#accounts-view");
}

for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener("click", showView);
}

function showView(e) {
  for (let i = 0; i < views.length; i++) {
    views[i].style.display = "none";
  }
  if (e instanceof Event) {
    e.preventDefault();
    let id = `#${this.getAttribute("href")}`;
    document.querySelector(id).style.display = "block";
  } else {
    document.querySelector(e).style.display = "block";
  }
}

createAccountsTable();

function createAccountsTable() {
  let htmlAccounts = ``;
  for (let i = 0; i < db.length; i++) {
    const account = db[i];

    htmlAccounts += `
    <tr>
        <td>${account.id}</td>
        <td>${account.name}</td>
        <td>${account.lastName}</td>
        <td>${account.email}</td>
        <td>${account.phone}</td>
        <td><button data-id="${i}" class="edit-btn btn-sm btn-warning">Edit</button></td>
        <td><button data-id="${i}" class="delete-btn btn-sm btn-danger">Delete</button></td>
    </tr>
    `;
  }

  accountsTableBody.innerHTML = htmlAccounts;
  let allDeleteBtns = document.querySelectorAll(".delete-btn");
  let allEditBtns = document.querySelectorAll(".edit-btn");

  for (let i = 0; i < allDeleteBtns.length; i++) {
    allDeleteBtns[i].addEventListener("click", deleteAccount);
    allEditBtns[i].addEventListener("click", editAccount);
  }
}

function deleteAccount() {
  let id = this.getAttribute("data-id");
  db.splice(id, 1);
  createAccountsTable();
  showView("#accounts-view");
}

function editAccount() {
  id = this.getAttribute("data-id");
  let selectedAccount = db[id];
  eId.value = selectedAccount.id;
  eName.value = selectedAccount.name;
  eLastName.value = selectedAccount.lastName;
  eEmail.value = selectedAccount.email;
  ePhone.value = selectedAccount.phone;
  showView("#edit-account-view");
}

function save() {
  localStorage.db = JSON.stringify(db);
}
