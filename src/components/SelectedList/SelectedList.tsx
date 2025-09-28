// Selected items list component
import React from 'react';
import { useAutocompleteContext } from '../../providers/AppProvider';
import './SelectedList.css';

const SelectedList: React.FC = () => {
  const { selectedItems, handleRemoveItem } = useAutocompleteContext();

  const handleDeleteItem = (itemId: number) => {
    handleRemoveItem(itemId);
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
