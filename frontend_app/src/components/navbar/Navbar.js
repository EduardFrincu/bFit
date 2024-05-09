import React, {useEffect, useState} from 'react'
import {MenuItems} from './MenuItems'
import {useHistory, Link, useLocation} from 'react-router-dom';
import './Navbar.scss'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Button} from './NavbarButtons'
import logoImage from "../../assets/images/bFit.png";

function Navbar() {
    
    const [active, setActive] = useState(false);
    const location = useLocation();
    console.log(location.pathname);
    // const [token, setToken] = useState(false);
    // if(!cookie){
    //     setToken(cookie);
    // }
    // // else{
    // //     return null;
    // // }
    
    // useEffect(()=>{
    //     let cookie = new Cookies().get('token');
    //     console.log(token);
    //     setToken(cookie)
    // },[token])
    
    const history = useHistory();

    const handleClick = () => {
        setActive(!active);
    }
    const routeChange = (path) => {
        history.push(path);
    }


  return (
    <div>
    { 1 && <nav className='NavbarItems'>
        <h1 className='navbar-logo'> <Link to = "/"> <img className='logo' src={logoImage}/> </Link></h1> 
        <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={active ? faTimes : faBars}/>
        </div>
        <div>
        <ul className={active ? 'nav-menu active' : 'nav-menu'}>
            {MenuItems.map((item,index)=>{
                return(
                    <li key = {index}><a className={item.cName} href = {item.url} onClick= {() => item.onClick}> {item.title} </a></li>
                )
            })}
        </ul>
        </div>
        <Button onClick={() => {routeChange('/login'); new Cookies().remove('token'); window.location.reload(false);}}> Log out </Button>
    </nav>}
    </div>
  )
}

export default Navbar
