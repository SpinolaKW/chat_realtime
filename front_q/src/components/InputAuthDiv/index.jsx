import { useNavigate } from 'react-router-dom';
import { InputDiv, InputForm, SubmitButton } from './styles';
import { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from 'components/Chat';

const socket = io('http://localhost:3001');
socket.on('connect', () => {
  return console.log('[IO] Connect => New connection');
});

const InputAuthDiv = () => {

  const [userID, setUserID] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
      if (userID !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
   }

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event?.preventDefault();
    navigate('/room');
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      {!showChat ? (
      <><InputDiv>
          <h2>Usuário</h2>
          <input
            type='text'
            placeholder='Nome de usuário...'
            onChange={(event) => {
              setUserID(event.target.value);
            } } />
        </InputDiv><InputDiv>
            <h2>Sala</h2>
            <input
              type='text'
              placeholder='Nome da sala...'
              onChange={(event) => {
                setRoom(event.target.value);
              } } />
          </InputDiv><SubmitButton type='submit' onClick={joinRoom}>Entrar</SubmitButton></>
      ) : (
      <>
        <Chat socket={socket} userID={userID} room={room} />
      </>)}
    </InputForm>
  );
};

export default InputAuthDiv;
