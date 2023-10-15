const newNote = document.querySelector("#newNote");

// Get All Elements
const count = document.querySelector(".count span");
const container = document.querySelector(".container");

// Get Form Elements
const form = document.querySelector(".form");
const closeForm = document.querySelector(".closeIcon");

// Add Form Elements
const addForm = document.querySelector(".add-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#content");
const addBtn = document.querySelector("#formAddBtn");

// Edit Form Elements
const editForm = document.querySelector(".edit-form");
const editTitleInput = document.querySelector("#editTitle");
const editDescriptionInput = document.querySelector("#editContent");
const editBtn = document.querySelector("#formEditBtn");

let notes = [
  {
    id: 1,
    date: "23/06/2023",
    time: "07:32 AM",
    title: "note1",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio. Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio",
  },
  {
    id: 2,
    date: "11/05/2023",
    time: "12:00 PM",
    title: "note2",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio. Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio",
  },
  {
    id: 3,
    date: "04/03/2023",
    time: "01:30 PM",
    title: "note3",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio. Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Amet Ullam Illum Quibusdam Placeat Perspiciatis Inventore Aspernatur Voluptate Repudiandae Explicabo Optio",
  },
];

newNote.addEventListener("click", () => {
  form.classList.add("open");
  addForm.style.display = "block";
  editForm.style.display = "none";
});

closeForm.addEventListener("click", closeForms);

function closeForms() {
  form.classList.add("close");

  setTimeout(() => {
    form.classList.remove("open");
    form.classList.remove("close");
  }, 300);
  clearForm();
}

function getCount() {
  count.innerHTML = notes.length > 0 ? notes.length : 0;
}

function showNotes() {
  closeForms();
  getCount();
  container.innerHTML = "";
  notes.length >= 1
    ? notes.map((n) => {
        container.innerHTML += `
            <div class="note-box">
               <div class="note-date">
                  <p><span>${n.date}</span> ${n.time}</p>
               </div>

               <div class="note-content-details">
               <div class="note-title">
                  <h4>${n.title}</h4>
               </div>

               <div class="note-desc-content">
                  <p>
                     ${n.description}
                  </p>
               </div>
               </div>

               <div class="note-ctrl flex align-center gap-20">
               <div class="edit flex align-center justify-center gap-5" class="editNote" data-note=${n.id}>
                  <i class="icon-pencil editNote" data-note=${n.id}></i>
                  <p class="editNote" data-note=${n.id}>edit</p>
               </div>

               <div class="delete flex align-center justify-center gap-5" class="deleteNote" data-note=${n.id}>
                  <i class="icon-trash deleteNote" data-note=${n.id}></i>
                  <p class="deleteNote" data-note=${n.id}>delete</p>
               </div>
               </div>
            </div>
         `;
      })
    : (container.innerHTML = `<p class="text-center w-100">No notes</p>`);
}

window.addEventListener("load", () => {
  showNotes();
});

let currentNote;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editNote")) {
    addForm.style.display = "none";
    editForm.style.display = "block";

    const noteId = e.target.dataset.note;
    currentNote = notes.find((note) => note.id === +noteId);
    form.classList.add("open");
    editTitleInput.value = currentNote.title;
    editDescriptionInput.value = currentNote.description;
  }

  if (e.target.classList.contains("deleteNote")) {
    const noteId = e.target.dataset.note;
    deleteNoteHandler(+noteId);
  }
});

function deleteNoteHandler(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  showNotes();
}

function clearForm() {
  titleInput.value = "";
  descriptionInput.value = "";
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const getDate = getCurrentDate();
  let date = getDate.date;
  let time = getDate.time;

  if (editTitleInput.value && editDescriptionInput.value) {
    notes.find((note) => {
      if (note.id === currentNote.id) {
        note.title = editTitleInput.value;
        note.description = editDescriptionInput.value;
        note.date = date;
        note.time = time;
      }
    });

    showNotes();
  } else {
    alert("Please enter all information");
  }
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const getDate = getCurrentDate();
  let date = getDate.date;
  let time = getDate.time;

  if (titleInput.value && descriptionInput.value) {
    const newNote = {
      id: notes.length + 1,
      title: titleInput.value,
      description: descriptionInput.value,
      date,
      time,
    };

    notes.push(newNote);
    showNotes();
  } else {
    alert("Please enter all information");
  }
});

function getCurrentDate() {
  const getDate = new Date();
  let date = getDate.toLocaleString().split(", ")[0];
  let time = getDate.toLocaleString().split(", ")[1];
  const t = time.split(":");

  let h = t[0];
  let m = t[1];
  let x = t[2].split(" ")[1];

  h = h < 10 ? (h = `0${h}`) : h;
  time = `${h}:${m}:${x}`;

  return { date, time };
}
