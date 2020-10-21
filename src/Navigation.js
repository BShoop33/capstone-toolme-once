import React from "react";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Sons-of-Witches</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/Lend">Lend</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/chats">Chat</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tasks">Tasks</Link>
            </li>
        </ul>
    )
};