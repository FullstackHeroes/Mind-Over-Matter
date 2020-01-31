import React from "react";
import logo from "../images/logo.svg";
import VideoInput from "./face/VideoInput";


function App() {
  return (
    <div className="App">

      <h1>Mind Over Matter</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <VideoInput />
      </header>
    </div>
  );
}

export default App;

//this is the current Origin master App.js, if broken use this:
// import React from "react";
// import logo from "../images/logo.svg";
// import VideoInput from "./face/VideoInput";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <VideoInput />
//       </header>
//     </div>
//   );
// }

// export default App;
