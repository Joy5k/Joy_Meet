import io from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  path: '/api/v1/socket.io',
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: false 
});