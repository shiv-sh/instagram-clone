import React from 'react';
import './Post.css';

function Post() {
    return (
        <div>
            <h3>This is a post--</h3>
            {/* header -> avatar + username */}
            <img className="post_image" src ="logo192.png"></img>
            {/* image */}
            <h4 className="post_text"><strong>Shivam </strong>Instagaram will be there</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
