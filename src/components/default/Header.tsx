import {  NavLink } from "react-router";

export default function Header(){
    return (
        <header>
            <NavLink to="/auth">Auth</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
        </header>
    )
}