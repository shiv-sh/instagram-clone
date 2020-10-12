import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);
  // useffect runs a piece of code based on a specific condition

  useEffect(() => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
      ));
    })
  }, []);

  // if we leave empty array in useEffect it means it runs
  // when app component loads, and in this case it will run
  // whenever there is a change in posts

  return (
    <div className="App">

      {/* Header */}
      <div className="app_header">
        <img className="app_headerImage"
          src="insta-logo.png" style={{ height: '30px', width: '120px' }} />
      </div>
      {/* <h1>Hi this will be an instagram clone!!</h1> */}
      {/* Posts */}
      {
        posts.map(({post, id}) => (
          <Post key={id} username={post.username} caption={post.caption} img_url={post.img_url} />
        ))}
    </div>
  );
}

export default App;


// stopping at 1:29