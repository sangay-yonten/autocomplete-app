// Selected items list component
import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedItemsState } from '../../atoms';
import './SelectedList.css';

const SelectedList: React.FC = () => {
  const selectedItems = useRecoilValue(selectedItemsState);

  return (
    <div className="selected-list-container">
      <h3>Selected Items</h3>

      {selectedItems.length === 0 ? (
        <p className="no-items">No items selected yet</p>
      ) : (
        <ul className="selected-items">
          {selectedItems.map((item) => (
            <li key={item.id} className="selected-item">
              <span className="item-title">{item.title}</span>

              {/* Delete button only - update functionality removed */}
              <div className="item-actions">
                <button className="btn btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedList;
