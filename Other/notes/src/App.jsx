import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  // Fetch notes from the server.
  // useEffect is a hook that runs the code inside it only once when the
  // component is rendered for the first time.
  // The second argument of useEffect is an array that contains the variables 
  // that the effect depends on.
  // If the array is empty, the effect is only run along with the first render 
  // of the component.
  // If the array contains variables, the effect is run when any of the 
  // variables changes.
  // For example, if the array is [notes], the effect is run when the notes 
  // state changes.
  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App