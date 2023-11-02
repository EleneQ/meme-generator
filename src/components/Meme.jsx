import { useState, useEffect } from "react";
import "./Meme.css";
import memesData from "../memesData";

//the .form should probably be a form element, just using div so that the button doesn't submit
export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState(memesData);

  useEffect(() => {
    /* 
      fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => setAllMemes(data.data.memes));
    */

    /*
      useEffect takes a function as its parameter. If that function
      returns something, it needs to be a cleanup function. Otherwise,
      it should return nothing. An async function, automatically retuns
      a promise instead of a function or nothing. Therefore, if you want
      to use async operations inside of useEffect, you need to define 
      the function separately inside of the callback function, as seen
      below:
    */
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  });

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevMeme) => {
      return { ...prevMeme, randomImage: url };
    });
  }

  function inputHandler(event) {
    const { topText, bottomText } = meme;
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main className="main">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form__input"
          name="topText"
          onChange={inputHandler}
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form__input"
          name="bottomText"
          onChange={inputHandler}
          value={meme.bottomText}
        />
        <button className="form__button" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme__img" />
        <h2 className="meme__text top">{meme.topText}</h2>
        <h2 className="meme__text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
