import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import Popup from './components/Popup';
import BackgroundSVG from './assets/background.svg';
import EncSVG from './assets/enc.svg';
import './App.css';

const App = () => {
	const [activeGroup, setActiveGroup] = useState(null);
	const [groups, setGroups] = useState([]);
	const [notes, setNotes] = useState({});
	const [showPopup, setShowPopup] = useState(false);
	const popupRef = useRef(null);

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

	// Handle clicks outside the popup to close it
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

	useEffect(() => {
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
	const getInitials = (name) => {
		const words = name.split(' ');
		if (words.length === 1) {
			return words[0].charAt(0).toUpperCase(); // First letter for a single word
		}
		return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join(''); // First two letters of the first two words
	};

	return (
		<div className="app-container">
			{/* Sidebar for listing groups */}
			<Sidebar
				className="sidebar"
				groups={groups}
				handleGroupClick={handleGroupClick}
				activeGroup={activeGroup}
				onAddGroup={() => setShowPopup(true)} // Show popup when adding a new group
			/>
			
			<div className="main-content">
				{activeGroup === null || (groups.length === 0) ? (  // Check if there is no active group or if there are no groups
					// If there are no active groups, render the SVG image with text
					<div className="no-groups">
						<img src={BackgroundSVG} alt="No groups available" className="background-svg" />
						<h1>
							Pocket Notes
						</h1>
						<h3>
							Send and receive messages without keeping your phone online.<br/>
							Use Pocket Notes on up to 4 linked devices and 1 mobile phone
						</h3>
						<footer>
							<img src={EncSVG} alt="Encrypted icon" className="enc-svg"/>
							<p>end-to-end encrypted</p>
						</footer>
					</div>
				) : (
					// If there are active groups, render the NotesList
					<div className='notes-container' >
						<div className="notes-header">
							<div 
								className="profile-photo"
								style={{ backgroundColor: activeGroup.color }}
							>
								{getInitials(activeGroup.name)} {/* Circular profile photo with initials */}
							</div>
							<h1>{activeGroup?.name}</h1>
						</div>
						<NotesList 
							notes={notes[activeGroup?.id] || []} // Display notes of the active group
							onSave={handleSaveNote}              // Pass the saveNote function to NotesList
						/>
					</div>
				)}
			</div>

			{/* Popup for adding a new group */}
			{showPopup && <Popup ref={popupRef} onAddGroup={handleAddGroup} />}
		</div>
	);
};

export default App;
