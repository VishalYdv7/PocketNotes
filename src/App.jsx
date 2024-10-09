import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import Popup from './components/Popup';
import './App.css';

const App = () => {
	const [activeGroup, setActiveGroup] = useState(null);
	const [groups, setGroups] = useState([]);
	const [notes, setNotes] = useState({});
	const [showPopup, setShowPopup] = useState(false);

	// Load groups and notes from local storage
	useEffect(() => {
		const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
		const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
		
		if (savedGroups.length > 0) setGroups(savedGroups);
		if (Object.keys(savedNotes).length > 0) setNotes(savedNotes);
	}, []);
	
	// Save groups and notes to local storage whenever they change
	useEffect(() => {
		localStorage.setItem('groups', JSON.stringify(groups));
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [groups, notes]);

	// Set the active group when clicking on a group in the Sidebar
	const handleGroupClick = (group) => {
		setActiveGroup(group);
	};

	// Add a new group to the list
	const handleAddGroup = (newGroup) => {
		const groupWithId = { ...newGroup, id: Date.now() }; // Assign a unique ID to the new group
		setGroups([...groups, groupWithId]);  // Add the new group to the existing groups array
		setShowPopup(false); // Close the popup after adding the group
	};

	// Save a new note to the current active group
	const handleSaveNote = (noteContent) => {
		if (activeGroup) {
			const newNote = {
				content: noteContent,
				timestamp: new Date().toISOString() // Get current date and time in ISO format
			};

			// Update the notes state, adding the new note to the active group
			setNotes({
				...notes,
				[activeGroup.id]: [...(notes[activeGroup.id] || []), newNote],
			});
		}
	};

	return (
		<div className="app-container">
			{/* Sidebar for listing groups */}
			<Sidebar
				groups={groups}
				handleGroupClick={handleGroupClick}
				activeGroup={activeGroup}
				onAddGroup={() => setShowPopup(true)} // Show popup when adding a new group
			/>
			
			<div className="main-content">
				{/* NotesList to display notes of the selected group and handle note saving */}
				<NotesList 
					notes={notes[activeGroup?.id] || []} // Display notes of the active group
					onSave={handleSaveNote}              // Pass the saveNote function to NotesList
				/>
			</div>

			{/* Popup for adding a new group */}
			{showPopup && <Popup onClose={() => setShowPopup(false)} onAddGroup={handleAddGroup} />}
		</div>
	);
};

export default App;
