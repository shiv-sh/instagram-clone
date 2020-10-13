import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in!!
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // don't update username
        }
        // else {
        //   // if we just created someone
        //   return authUser.updateProfile({
        //     displayName:userName
        //   })
        // }

      } else {
        // user has logged out!!
        setUser(null);
      }
    })

    return () => {
      //perforn cleanup actions
      unsubscribe();
    }
  }, [user, userName]);

  useEffect(() => {
    //this is where the code runs
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: userName
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app_signup">

              <img className="app_headerImage"
                src="insta-logo.png" style={{ height: '30px', width: '120px' }}
                alt="" />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={signIn}>Sign Up</Button>

            </form>
          </center>
        </div>

      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app_signup">

              <img className="app_headerImage"
                src="insta-logo.png" style={{ height: '30px', width: '120px' }}
                alt="" />
              <Input
                placeholder="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={signUp}>Sign Up</Button>

            </form>
          </center>
        </div>

      </Modal>
      {/* Header */}
      <div className="app_header">
        <img className="app_headerImage"
          src="insta-logo.png" />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>)
          : (
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
              <Button onClick={() => setOpen(true)}>Signup</Button>
            </div>

          )}
      </div>

      <div className="app_posts">
        <div className="app_postsLeft">
          {
            posts.map(({ post, id }) => (
              <Post key={id} signedInUser={user} postId={id} username={post.username} caption={post.caption} img_url={post.img_url} />
            ))}
        </div>
        <div className="app_postsRight">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload userName={user.displayName} />
      ) : <h3>Sorry you need to login to upload</h3>}
    </div>
  );
}

export default App;


// stopping at 1:29