// MovableText.jsx
import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
// import 'react-resizable/css/styles.css';

const MovableText = (props) => {
  console.log(props.text);


  const [text, setText] = React.useState('enter text here');
  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(100);

  const handleResize = (e, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const overallstyle = {
    
    // padding: '0 5px',
    //  width: 'auto',
    // height: height, 
    // border: '5px dashed black', 
    // display: 'flex', 
    // alignItems: 'center', 
    // justifyContent: 'center' 
  }

  const textstyle = {
    // width: '100%', 
    // height: '100%', 
    // border: 'none', 
    // textAlign: 'center',
    // color : 'red',

    // margin: '15px 0',
    // padding: '0 5px',
    // fontFamily: 'impact, sans-serif',
    // fontSize: '2em',
    // textTransform: 'uppercase',
    // color: 'black',
    // letterSpacing: '1px',

    // textShadow: '2px 2px 0 #000 -2px -2px 0 #000 2px -2px 0 #000 -2px 2px 0 #000',

    // textShadow:'2px 2px 0 #000 -2px -2px 0 #000 2px -2px 0 #000 -2px 2px 0 #000 0 2px 0 #000 2px 0 0 #000 0 -2px 0 #000 -2px 0 0 #000 2px 2px 5px #000'
    
  
  }

  return (
    <Draggable bounds="parent">
      <Resizable height={height} width={width} onResize={handleResize}>
        <div style={overallstyle} className='inputcontainer' id={props.id}>
          
          <input
          className={props.class}
           placeholder="Enter your text here"
            type="textbox"
            value={text}
            onChange={(e) => setText(e.target.value)}
            // style={textstyle}
          />
           {/* <span>
          <i class="fa-solid fa-arrows-up-down-left-right"></i>
          </span> */}
        </div>
       
      </Resizable>
    </Draggable>
  );
};

export default MovableText;


