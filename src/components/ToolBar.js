import React from 'react';

const ToolBar = ({ selectedTool, setSelectedTool, color, setColor }) => {
  return (
    <div className="toolbar">
      <button
        onClick={() => setSelectedTool('pencil')}
        className={selectedTool === 'pencil' ? 'active' : ''}
      >
        Pencil
      </button>
      <button
        onClick={() => setSelectedTool('eraser')}
        className={selectedTool === 'eraser' ? 'active' : ''}
      >
        Eraser
      </button>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default ToolBar;