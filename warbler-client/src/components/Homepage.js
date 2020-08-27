import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";
export default function (props) {
    const { currentUser } = props;
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>What's Good G</h1>
                <h4>New to Shawn's Place?</h4>
                <Link to="/signup" className="btn btn-primary">
                    Sign Up
                </Link>
            </div>
        );
    }
    return (
        <div className="home-signedin">
                <h1>Hellur, Welcome back {currentUser.user.username}</h1>
                <MessageTimeline
                    profileImg={currentUser.user.profileImgUrl}
                    username={currentUser.user.username}
                />
        </div>

    )
}