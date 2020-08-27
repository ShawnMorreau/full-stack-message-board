import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const MessageItem = ({ date, profileImgUrl, text, username, onRemove, isCorrectUser }) => {
    return (
        <li className="list-group-item">
        
            <img src={DefaultProfileImg} alt={username} height="100" width="100" className="timeline-image" />
            <div className="message-area">
                <Link to="/">@{username}</Link>
                &nbsp;
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
                {isCorrectUser &&(
                    <button onClick={onRemove}>TRASH</button>
                )}
            </div>
        </li>
    )
}
export default MessageItem;