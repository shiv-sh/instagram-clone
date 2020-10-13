import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from "firebase";
import './ImageUpload.css';

function ImageUpload({userName}) {
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState(0);
    const [caption,setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        console.log("inside")
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress fnction...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image insde db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        img_url:url,
                        username:userName
                    });

                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })

            }
        )
    }

    return (
        <div className="imageUpload">
            <progress className="imageUpload_progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption.."
            onChange={(e)=>setCaption(e.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
            Upload
            </Button>
        </div>
    )
}

export default ImageUpload
