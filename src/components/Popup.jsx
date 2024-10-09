import React, { useState, forwardRef } from 'react';
import styles from './Popup.module.css';  // Import styles from CSS module

const Popup = forwardRef(({ onAddGroup }, ref) => {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']; // Color options

    const handleSubmit = () => {
        if (groupName.trim() && selectedColor) { // Check for both group name and color
            onAddGroup({ name: groupName.trim(), color: selectedColor });
            setGroupName('');
            setSelectedColor('');
        } else {
            alert('Please provide both a group name and select a color.');
        }
    };

    return (
        <div className={styles.popupOverlay}>
            <div ref={ref} className={styles.popupContent}> {/* Apply ref here */}
                <h2>Create New Group</h2>
                <div className={styles.groupName}>
                    <h3>Group Name</h3>
                    <input
                        type="text"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.colorRow}>
                    <h3>Choose colour</h3>
                    <div className={styles.colorOptions}>
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`${styles.colorBox} ${selectedColor === color ? styles.selected : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.popupActions}>
                    <button
                        onClick={handleSubmit}
                        disabled={!groupName.trim() || !selectedColor} // Disable button if conditions are not met
                        className={styles.createButton}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
});

// Set a display name for the Popup component
Popup.displayName = 'Popup';

export default Popup;
