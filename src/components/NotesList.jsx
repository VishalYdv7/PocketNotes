import React, { useState } from 'react';
import styles from './NotesList.module.css'; // Import styles from CSS Module
import sendIcon from '../assets/sendIcon.svg';

const NotesList = ({ notes = [], onSave }) => {
    const [noteContent, setNoteContent] = useState('');
    
    const handleSave = () => {
        if (noteContent.trim()) {
            onSave(noteContent);
            setNoteContent(''); // Clear the input after saving
        }
    };

    return (
        <div className={styles.notesContainer}>
            <div className={styles.notesList}>
                {notes.length ? (
                    notes.map((note, index) => (
                        <div key={index} className={styles.noteItem}>
                            <div className={styles.noteText}>{note.content}</div>
                            <div className={styles.noteTimestamp}>
                            {new Date(note.timestamp).toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })} ● {/* Thick dot */}
                            {new Date(note.timestamp).toLocaleString('en-GB', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
            <div className={styles.noteInputContainer}>
                <div className={styles.inputAndSend}>
                    <textarea
                        className={styles.noteInput}
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent the default behavior of adding a new line
                                handleSave(); // Call your save function
                            }
                        }}
                        placeholder="Enter your text here..........."
                    />
                    <img
                        src={sendIcon}
                        className={noteContent.trim() ? styles.activeSendIcon : styles.inactiveSendIcon}
                        onClick={handleSave}
                        alt="Send Icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotesList;