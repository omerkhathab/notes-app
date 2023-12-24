let submit = document.querySelector(".submit");
const storedArrayString = localStorage.getItem("notes");
const notesArray = JSON.parse(storedArrayString) || [];
renderNotes();

function addNote() {
  let inputTitle = document.querySelector(".title");
  let title = inputTitle.value;
  let inputText = document.querySelector(".note");
  let text = inputText.value;

  if (title != "" || text != "") {
    notesArray.push({ title, text });
  }

  renderNotes();

  inputTitle.value = "";
  inputText.value = "";
}

submit.addEventListener("click", () => {
  addNote();
});

function renderNotes() {
  let inputString = "";
  notesArray.forEach((e) => {
    const note = `
    <div class="card m-1" style="width: 20rem; min-width: 30%">
    <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">${e.text}</p>
        <button class="btn btn-danger delete">Delete</button>
    </div>
    </div>
    `;
    inputString += note;
  });

  if (notesArray.length) {
    localStorage.setItem("notes", JSON.stringify(notesArray));
  } else {
    localStorage.clear();
  }

  if (inputString == "") {
    inputString = `
            <div class="card m-1" style="width: 20rem; min-width: 30%">
    <div class="card-body">
    <h5 class="card-title">Sample Note</h5>
    <p class="card-text">
        This is a sample note. Add to see yours here!
    </p>
    </div>
</div>
            `;
  }

  const main = document.querySelector(".main-notes");
  let mainContent = main.innerHTML;
  mainContent = inputString;

  main.innerHTML = mainContent;
  let deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      notesArray.splice(index, 1);
      renderNotes();
    });
  });
}

const deleteAll = document.querySelector(".delete-all");
deleteAll.addEventListener("click", () => {
  if (notesArray.length) {
    localStorage.clear();
    notesArray.length = 0;
    renderNotes();
  }
});
