import React, { useState } from 'react';
import './NotesList.css'; // Ensure you have this CSS file imported

const NotesList = ({ notes = [], onSave }) => {
    const [noteContent, setNoteContent] = useState('');
    const handleSave = () => {
        if (noteContent.trim()) {
        onSave(noteContent);
        setNoteContent(''); // Clear the input after saving
        }
    };
    return (
        <div className="notes">
            <div className='note-list'>
                {notes.length ? (
                    notes.map((note, index) => (
                    <div key={index} className="note-item">
                        <div className="note-content">{note.content}</div>
                        <div className="note-timestamp">
                        {new Date(note.timestamp).toLocaleString()} {/* Format the timestamp */}
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="no-notes">
                    </div>
                )}
            </div>
            <div className="note-editor">
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your note here..."
                />
                <button onClick={handleSave}>Save Note</button>
            </div>
        </div>
    );
};

export default NotesList;