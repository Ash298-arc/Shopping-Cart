document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes');

    function getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        const notes = getNotes();
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button class="delete-note" data-index="${index}">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    function addNote() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = getNotes();
            notes.push(noteText);
            saveNotes(notes);
            noteInput.value = '';
            renderNotes();
        }
    }

    function deleteNote(index) {
        const notes = getNotes();
        notes.splice(index, 1);
        saveNotes(notes);
        renderNotes();
    }

    notesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-note')) {
            const index = e.target.getAttribute('data-index');
            deleteNote(index);
        }
    });

    addNoteButton.addEventListener('click', addNote);

    renderNotes();
});
