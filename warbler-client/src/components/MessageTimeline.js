import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";
export default function(props){
    return(
        <div className="row">
            <UserAside
                profileImg={props.profileImg}
                username={props.username}
            />
            <MessageList/>
        </div>
    )
}