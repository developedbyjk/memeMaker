import React from "react"
import Meme from "./components/Meme"
import "./App.css"
import MovableText from './MovableText';

export default function App() {
    return (
        <div className="memebg">
            
            {/* <MovableText /> */}
            <Meme />
        </div>
    )
}
