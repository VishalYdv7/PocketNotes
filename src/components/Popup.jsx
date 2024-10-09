import React, { useState } from 'react';

const Popup = ({ onClose, onAddGroup }) => {
const [groupName, setGroupName] = useState('');
const [selectedColor, setSelectedColor] = useState('');

const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']; // Color options

const handleSubmit = () => {
    if (groupName.trim()) {
    onAddGroup({ name: groupName.trim(), color: selectedColor });
    setGroupName('');
    setSelectedColor('');
    }
};

return (
    <div className="Popup-overlay">
    <div className="Popup-content">
        <h2>Create New Group</h2>
        <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="color-options">
        {colors.map((color) => (
            <div
            key={color}
            className={`color-box ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
            />
        ))}
        </div>
        <div className="Popup-actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSubmit}>Create</button>
        </div>
    </div>
    </div>
);
};

export default Popup;