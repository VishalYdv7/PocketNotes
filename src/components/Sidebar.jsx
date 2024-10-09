import React from 'react';

const Sidebar = ({ groups, handleGroupClick, activeGroup, onAddGroup }) => {
return (
    <div className="sidebar">
    {groups.map((group) => (
        <div
        key={group.id}  // Use id for key
        className={`group-item ${group.id === activeGroup?.id ? 'active' : ''}`}
        onClick={() => handleGroupClick(group)}
        style={{ backgroundColor: group.color }}
        >
        {group.name}
        </div>
    ))}

    {/* Plus icon at the bottom-right */}
    <div className="add-group-button" onClick={onAddGroup}>
        +
    </div>
    </div>
);
};

export default Sidebar;