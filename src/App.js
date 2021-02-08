import "./App.css";
import React from "react";

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

function App() {
  const [userName, setUserName] = React.useState({
    hasUsername: false,
    userName: "",
  });

  return (
    <div className="App">
      <div className="App-header">
        {userName.hasUsername ? (
          <h1>userName = {userName.userName}</h1>
        ) : (
          <InitialScreen userName={userName} setUserName={setUserName} />
        )}
      </div>
    </div>
  );
}

export default App;
