import React from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'

const Header = (props) => {
    return (
        <header>
            <div className='header'>
                <h1 className='text'>{props.headertext}</h1>
                <div className='btns'>
                    <Link to ={props.path}><button className='Abtn' onClick={props.onClickSubmit}>{props.btn}</button></Link>
                    <Link to ={props.path2}><button className='Mbtn' onClick={props.onClickHandle}>{props.btn2}</button></Link>   
                </div>
                <hr className='hline'/>
            </div>
        </header>
    )
}
export default Header;