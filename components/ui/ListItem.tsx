import React from 'react';
import { X } from 'lucide-react';

interface ListItemProps {
  text: string;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, onDelete }) => {
  return (
    <li className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm mb-2 group animate-fadeIn">
      <span className="text-gray-800 break-all pr-2">{text}</span>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full p-1"
        aria-label="Delete item"
      >
        <X size={18} />
      </button>
    </li>
  );
};

export default ListItem;