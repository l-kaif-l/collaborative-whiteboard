import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import Canvas from './Canvas';
import ToolBar from './ToolBar';
import UserList from './UserList';

const socket = io('http://localhost:3001');

const Whiteboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    socket.on('updateUsers', (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.off('updateUsers');
    };
  }, []);

  const handleDraw = useCallback((data) => {
    socket.emit('draw', data);
  }, []);

  return (
    <div className="whiteboard">
      <ToolBar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        color={color}
        setColor={setColor}
      />
      <Canvas
        selectedTool={selectedTool}
        color={color}
        onDraw={handleDraw}
        socket={socket}
      />
      <UserList users={users} />
    </div>
  );
};

export default Whiteboard;