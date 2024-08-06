// MovableText.jsx
import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
// import 'react-resizable/css/styles.css';

const MovableText = (props) => {
  console.log(props.text);


  const [text, setText] = React.useState('');
  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(100);

  const handleResize = (e, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };


  return (
    <Draggable bounds="parent">
      <Resizable height={height} width={width} onResize={handleResize}>
        <div className='inputcontainer' id={props.id}>
          
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


