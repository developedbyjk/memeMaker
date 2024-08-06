import React, { useRef } from "react";
import MovableText from "../MovableText";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "",
    });
    const [allMemes, setAllMemes] = React.useState([]);
    const canvasRef = useRef(null);



    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
       
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({ ...prevMeme, randomImage: url }));
    }
   
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes));
   

    }, []);

    React.useEffect(() => {
        if(allMemes.length > 0) {
            setMeme(prevMeme => ({ ...prevMeme, randomImage: getMemeImage() }));
        }
    }, [allMemes]);

 

    const memeContainerRef = useRef(null);

   
    function downloadMeme() {
        const canvas = canvasRef.current;
        console.log("this is " + canvas);
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous"; // Set crossOrigin attribute
        image.src = meme.randomImage;
    
        image.onload = () => {
            console.log("on load triggered");
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
    
            console.log('this is meme' + JSON.stringify(meme))
            console.log('this is meme top' + JSON.stringify(meme.topText))

            // Draw top text
            if (meme.topText) {
                console.log(meme.topText);
                ctx.fillText('meme.topText', canvas.width / 2, 50);
                ctx.strokeText("meme.topText", canvas.width / 2, 50);
            }
    
            // Draw bottom text
            if (meme.bottomText) {
              
                ctx.fillText("meme.bottomText", canvas.width / 2, canvas.height - 20);
                ctx.strokeText("meme.bottomText", canvas.width / 2, canvas.height - 20);
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
                {/* <button
                    id = "download"
                    className="form--button"
                    onClick={downloadMeme}
                >
                    Download
                </button> */}
                
             </div>

            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            <div className="footer"><a href="https://junedkhan.me/" target="_blank">by JK🧑‍💻</a></div>
        </main>
        
    );
}
