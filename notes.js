// saves the array of notes to the browser's local storage.

function savesNotesToLocalStorage(notes){
    // converts the notes array to a  JSON <- Javascript object notation, a text based format used for storing and transferring data and storing
    // it under the key notes.
    localStorage.setItem('notes',JSON.stringify(notes))
}

// retrieving the notes from the local storage
function getNotesFromLocalStorage(){
    // We are recieving the JSON string from the local storage and converting it into an array or passing it back to an array or returning an 
    // empty array if the data in not found.
    // || = or
    return JSON.parse(localStorage.getItem('notes')) || [];
}

// renders the list of the notes on the webpage/ showing off your data.

function renderNotes(){
    // get the current notes from the local storage
    const notes= getNotesFromLocalStorage();
    // selecting the elements with id notes list to display the notes
    const noteList= document.getElementById('notesList')
    // clearing the current list content to prevent duplication.
    noteList.innerHTML= "";

    // travelling over each notes in the array

    notes.forEach((text,index) => {
        // creating a new list item element for each note

        const li= document.createElement('li');
        // adding a class for styling
        
        li.className='note-item';

        // setting the inner HTML of the list item including the note text and the delete button

        li.innerHTML=`${text}
        <button class="delete-btn" onclick="deleteNote(${index})">x</button>`;

        // adding the new note to the beginning of the list.

        noteList.prepend(li);

    });
}

// handling the AddingANewNote function.

function addNote(){
    // let's select the input field where the user types a note

    const input= document.querySelector(".note-input");

    // removing the white space.
    
    const text= input.value.trim();

    // if the input is empty, do nothing.

    if(text === 'empty') return;

    // retrieving the current list of notes.

    const notes= getNotesFromLocalStorage();
    notes.unshift(text);

    // saving the updated array

    savesNotesToLocalStorage(notes);

    // updating the list

    renderNotes();

    // clearing the input field.

    input.value='';
}

// delete a note by index.

function deleteNote(index){
    // retieving the current list of notes

    const notes= getNotesFromLocalStorage();

    // removing the note at the specified index.

    notes.splice(index,1);

    // saving the updated array to local storage.

    savesNotesToLocalStorage(notes);

    // refreshing the notes list.

    renderNotes();
}

// when the page loads, we will refresh the notes initially.

window.unload=renderNotes;