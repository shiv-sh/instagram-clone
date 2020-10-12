import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, img_url}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="Shivam"
                    src="wwwww.jpg"
                />
                <h3>{username}</h3>
            </div>
            {/* header -> avatar + username */}
            <img className="post_image" src={img_url}></img>
            {/* image */}
            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
