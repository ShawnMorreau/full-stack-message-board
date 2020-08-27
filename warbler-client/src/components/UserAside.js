import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const UserAside = ({profileImg,username})=>{
    return(
        <div className="col-sm-2">
            <div className="panel panel-default">
                <div className="panel-body">
                    <img src={DefaultProfileImg} alt={username} className="img-thumbnail"/>
                </div>
            </div>
        </div>
    );
}

export default UserAside;