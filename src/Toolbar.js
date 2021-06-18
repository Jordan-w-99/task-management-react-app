import './Toolbar.css';
import React from 'react';

class Toolbar extends React.Component{
    render(){
        return(
            <div id="toolbar">
                <BoardTitle />
            </div>     
        )
    }
}

class BoardTitle extends React.Component{
    render(){
        return(
            <h1 id="board-title">Board Title</h1>
        )
    }
}

export default Toolbar