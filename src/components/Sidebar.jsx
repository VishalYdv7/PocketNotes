import React from 'react';
import styles from './Sidebar.module.css';

const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase(); // First letter for a single word
    }
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join(''); // First two letters of the first two words
};
const Sidebar = ({ groups, handleGroupClick, activeGroup, onAddGroup }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>
                Pocket Notes
            </div>
            <div className={styles.groupsList}>
                {groups.map((group) => (
                    <div
                        key={group.id}  // Use id for key
                        className={`${styles.groupItem} ${group.id === activeGroup?.id ? styles.active : ''}`}
                        onClick={() => handleGroupClick(group)}
                        style={{
                            backgroundColor: activeGroup === group ? '#2F2F2F2B': 'transparent',
                        }}
                    >
                        <div 
                            className={styles.profilePhoto}
                            style={{ backgroundColor: group.color }}
                        >
                            {getInitials(group.name)} {/* Circular profile photo with initials */}
                        </div>
                        {group.name}
                    </div>
                ))}
            </div>
            {/* Plus icon at the bottom-right */}
            <div className={styles.addGroupButton} onClick={onAddGroup}>
                +
            </div>
        </div>
    );
};

export default Sidebar;