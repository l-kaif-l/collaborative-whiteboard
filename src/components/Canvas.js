import React, { useRef, useEffect } from 'react';

const Canvas = ({ selectedTool, color, onDraw, socket }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startDrawing = (e) => {
      isDrawing.current = true;
      draw(e);
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = color;

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);

      onDraw({ x, y, color, tool: selectedTool });
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    socket.on('draw', (data) => {
      const { x, y, color, tool } = data;
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    });

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      socket.off('draw');
    };
  }, [color, selectedTool, onDraw, socket]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;