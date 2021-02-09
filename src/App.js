import "./App.css";
import React, { useEffect } from "react";
import * as FirestoreService from "./services/firestore";

function AllMessagesDisplay({ userName }) {
  const [allMessages, setAllMessages] = React.useState([]);

  React.useEffect(() => {
    FirestoreService.readMessagesStream((querySnapshot) => {
      let messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.unshift(doc.data());
        console.log("MESSAGE ADDED" + doc.data().message);
      });
      console.log(messagesArray);
      setAllMessages(messagesArray.reverse());
    });
  }, []);
  return allMessages.map((message) => {
    if (userName.userName === message.userName) {
      return (
        <div className="messageStyles" style={{ marginLeft: "49%" }}>
          <span className="messageSentUserName">{message.userName}</span>
          <p style={{ backgroundColor: "#ff5f6d", color: "#fff" }}>
            {message.message}
          </p>
          <span className="messageSentTime">{message.time}</span>
        </div>
      );
    } else {
      return (
        <div className="messageStyles">
          <span className="messageSentUserName">{message.userName}</span>
          <p>{message.message}</p>
          <span className="messageSentTime">{message.time}</span>
        </div>
      );
    }
  });
}

function InitialScreen({ userName, setUserName }) {
  function onChange(event) {
    setUserName({ ...userName, [event.target.name]: event.target.value });
  }

  function submitData(event) {
    event.preventDefault();
    setUserName({ ...userName, hasUsername: true });
  }

  return (
    <form onSubmit={submitData}>
      <input
        type="text"
        placeholder="Enter username"
        name="userName"
        value={userName.userName}
        onChange={onChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function ChatBox({ userName }) {
  const [message, setMessage] = React.useState("");

  function onChange(event) {
    return setMessage(event.target.value);
  }

  function sendMessage(event) {
    event.preventDefault();
    FirestoreService.addMessage(userName["userName"], message)
      .then((e) => {
        console.log(e);
        setMessage("");
      })
      .catch((e) => console.error(e));
  }

  // Scrolling to the bottom after message is sent/received.
  const messageStylesRef = React.useRef();
  React.useLayoutEffect(() => {
    if (messageStylesRef.current) {
      messageStylesRef.current.scrollTop =
        messageStylesRef.current.scrollHeight;
    }
  });

  return (
    <div className="containerChatBox">
      <div className="usersInChat">
        <h5>Currently in chat</h5>
        <ul>
          <li>John Doe</li>
          <li>John Doe</li>
          <li>John Doe</li>
          <li>John Doe</li>
        </ul>
      </div>
      <div className="chatBox">
        <div className="forScrolling" ref={messageStylesRef}>
          {<AllMessagesDisplay userName={userName} />}
        </div>
        <div className="inputMessageField">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Your message"
              value={message}
              onChange={onChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [userName, setUserName] = React.useState({
    hasUsername: false,
    userName: "",
  });

  return (
    <div className="App">
      <div className="App-header">
        {userName.hasUsername ? (
          <>
            <h1>userName = {userName.userName}</h1>
            <ChatBox userName={userName} />
          </>
        ) : (
          <InitialScreen userName={userName} setUserName={setUserName} />
        )}
      </div>
    </div>
  );
}

export default App;
