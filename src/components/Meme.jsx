import React, { useRef } from "react";
import MovableText from "../MovableText";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMemes, setAllMemes] = React.useState([]);
    const canvasRef = useRef(null);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({ ...prevMeme, randomImage: url }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({ ...prevMeme, [name]: value }));
    }

    const memeContainerRef = useRef(null);

    function downloadMeme() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous"; // Set crossOrigin attribute
        image.src = meme.randomImage;

        image.onload = () => {
            // Set canvas size to match the image
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            // Text styling
            ctx.font = "30px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.textAlign = "center";
            ctx.lineWidth = 2;
            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Get the positions of the text elements
            const topTextElement = document.getElementById('top');
            const bottomTextElement = document.getElementById('bottom');
            const memeContainerRect = memeContainerRef.current.getBoundingClientRect();

            // Calculate the position of the top text relative to the image
            if (topTextElement) {
                const topTextRect = topTextElement.getBoundingClientRect();
                const topTextX = (topTextRect.left + topTextRect.right) / 2 - memeContainerRect.left;
                const topTextY = topTextRect.top - memeContainerRect.top + topTextRect.height / 2;
                ctx.fillText(topTextElement.value, topTextX, topTextY);
                ctx.strokeText(topTextElement.value, topTextX, topTextY);
            }

            // Calculate the position of the bottom text relative to the image
            if (bottomTextElement) {
                const bottomTextRect = bottomTextElement.getBoundingClientRect();
                const bottomTextX = (bottomTextRect.left + bottomTextRect.right) / 2 - memeContainerRect.left;
                const bottomTextY = bottomTextRect.top - memeContainerRect.top + bottomTextRect.height / 2;
                ctx.fillText(bottomTextElement.value, bottomTextX, bottomTextY);
                ctx.strokeText(bottomTextElement.value, bottomTextX, bottomTextY);
            }

            // Create a link to download the canvas as an image
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        };

        image.onerror = () => {
            alert('Failed to load the image. Please try a different one.');
        };
    }
    
    

    return (
        <main className="mainsection">
         
       

            <div className="meme">

                <img src={meme.randomImage} className="meme--image" />
                <MovableText id={'top'} class={'meme--text'} text={meme.topText} />
                <MovableText id={'bottom'} class={'meme--text'} text={meme.bottomText}/>
               
            </div>

              
             <div>
                  
          
        
                  
             <button
                    className="form--button"
                    id="new-image"
                    onClick={getMemeImage}
                >
                    New Image
                </button>
                <button
                    id = "download"
                    className="form--button"
                    onClick={downloadMeme}
                >
                    Download
                </button>
                
             </div>

            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </main>
    );
}
