# Real-Time Collaborative Whiteboard

This project implements a real-time collaborative whiteboard using React and Socket.IO.

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/collaborative-whiteboard.git
   cd collaborative-whiteboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
collaborative-whiteboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Whiteboard.js
│   │   ├── Canvas.js
│   │   ├── ToolBar.js
│   │   └── UserList.js
│   ├── App.js
│   └── index.js
├── server/
│   └── server.js
├── package.json
└── README.md
```

## Case Study Questions and Answers

### 1. How would you set up a real-time WebSocket connection in a React component for collaborative editing?

The real-time WebSocket connection is set up using Socket.IO:

- Install Socket.IO client: `npm install socket.io-client`
- Create a WebSocket connection in the React component:
  ```javascript
  import io from 'socket.io-client';
  const socket = io('http://localhost:3001');
  ```
- Set up event listeners for connection and disconnection events.
- Implement real-time updates by emitting events when a user performs an action and listening for events from other users.
- Set up a server-side WebSocket handler using Express and Socket.IO to manage connections and broadcast events.

### 2. Describe how to implement drawing functionality on an HTML5 canvas using React.

Drawing functionality is implemented as follows:

- Create a Canvas component with a `useRef` hook to access the canvas element.
- Set up event listeners for mouse events (mousedown, mousemove, mouseup, mouseout).
- Implement drawing logic in the `draw` function, updating the canvas based on mouse position.
- Use the canvas 2D context to draw lines and shapes.
- Implement color and brush size selection by updating the canvas context properties.
- Create different drawing tools (e.g., pencil, eraser) by changing the `globalCompositeOperation` property.

### 3. How can you synchronize the state of the canvas across multiple users in real-time?

Canvas synchronization is achieved through WebSocket events:

- When a user draws, emit a 'draw' event to the server with the drawing data.
- The server broadcasts this event to all other connected clients.
- Each client's Canvas component listens for 'draw' events and updates its canvas accordingly.
- Implement a way to send the entire canvas state to new users when they join.
- Use efficient data structures to represent drawing actions for minimal network overhead.

### 4. Explain how you would handle and display the list of active users.

Handling and displaying active users involves:

- Maintaining a list of connected users on the server.
- Emitting 'userJoined' and 'userLeft' events when users connect or disconnect.
- Creating a UserList component in React to display the list of active users.
- Updating the UserList component when receiving user update events from the server.
- Implementing a unique identifier for each user (e.g., username or generated ID).

### 5. What measures would you take to ensure the scalability and performance of the real-time collaborative whiteboard?

Measures for scalability and performance include:

- Implementing efficient data structures for representing drawing actions.
- Using binary protocols (e.g., Protocol Buffers) for more efficient data transfer.
- Implementing rate limiting to prevent flooding of draw events.
- Using a distributed architecture with multiple server instances and a message queue.
- Implementing server-side caching to reduce database load.
- Using WebSocket compression to reduce bandwidth usage.
- Optimizing the client-side rendering process (e.g., using requestAnimationFrame).
- Implementing a conflict resolution strategy for simultaneous edits.
- Using a CDN for static assets to reduce server load.
- Implementing proper error handling and reconnection logic for network issues.
