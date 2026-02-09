services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    expose:
      - "8000"
    environment:
      - ENV=development
