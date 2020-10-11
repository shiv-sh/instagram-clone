import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="App">
      
    {/* Header */}
    <div className="app_header">
    <img className="app_headerImage"
    src = "insta-logo.png" style={{height:'30px',width:'120px'}}/>
    </div>
    {/* <h1>Hi this will be an instagram clone!!</h1> */}
    {/* Posts */}
    <Post/>
    </div>
  );
}

export default App;
