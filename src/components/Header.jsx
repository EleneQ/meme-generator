import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img
        src="https://freepngimg.com/save/98140-meme-trollface-png-file-hd/2000x1333"
        className="header--image"
      />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">React Course - Project 3</h4>
    </header>
  );
}