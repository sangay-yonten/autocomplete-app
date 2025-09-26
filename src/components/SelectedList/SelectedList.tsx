// Selected items list component
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedItemsState } from '../../atoms';
import './SelectedList.css';

const SelectedList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

  const handleDeleteItem = (itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="selected-list-container">
      <h3>Selected Users</h3>

      {selectedItems.length === 0 ? (
        <p className="no-items">No users selected yet</p>
      ) : (
        <ul className="selected-items">
          {selectedItems.map((item) => (
            <li key={item.id} className="selected-item">
              <span className="item-title">{item.title}</span>
              <span className="item-selected-at">Selected at: {item.email}</span>

              <div className="item-actions">
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteItem(item.id)}
                  aria-label={`Delete ${item.title}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedList;
