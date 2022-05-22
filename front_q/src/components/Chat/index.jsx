import {
  BodyDiv,
  ChatContainer,
  ChatDiv,
  InputDiv,
  TextBox,
  TitleDiv,
  Username,
} from './styles';
import { BiSend } from 'react-icons/bi';
import { useState, useEffect } from 'react';

const Chat = ({ socket, userID, room }) => {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: userID,
        message: message,
        time: 
        new Date(Date.now()).getHours() + 
        ":" + 
        new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <ChatContainer>
      <TitleDiv>
        <h2>APS - SALA X</h2>
      </TitleDiv>

      <BodyDiv>
        <ChatDiv>
          {messageList.map((messageContent) => {
            return (
              <>
              <Username id={userID === messageContent.author ? "você" : "outro"} />
              <TextBox>
                  <p>{messageContent.message}</p>
              </TextBox>
              <TextBox>
                  <p>{messageContent.time}</p>
                  <p>{messageContent.author}</p>
              </TextBox>
              </>
            );
          })}
        </ChatDiv>

        <InputDiv>
          <form>
            <input 
              type='text' 
              placeholder='Digite a sua mensagem' 
              onChange={ (event) => { 
                setMessage(event.target.value)
              } }
              onKeyPress = {(event) => { 
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>
              <BiSend size={20} />
            </button>
          </form>
        </InputDiv>

      </BodyDiv>
    </ChatContainer>
  );
};

export default Chat;
