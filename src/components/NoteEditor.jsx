import React, { useState } from 'react';

const NoteEditor = ({ onSave }) => {
    const [noteContent, setNoteContent] = useState('');
    const handleSave = () => {
        if (noteContent.trim()) {
        onSave(noteContent);
        setNoteContent(''); // Clear the input after saving
        }
    };

    return (
        <div className="note-editor">
        <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your note here..."
        />
        <button onClick={handleSave}>Save Note</button>
        </div>
    );
};

export default NoteEditor;