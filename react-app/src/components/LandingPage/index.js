import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import welcomeVideo  from './welcomeVideo.mp4'
import djImage from './dj-women-wallpaper.png'
import guitarPlayer from './guitar-player.png'
import engineer from './Engineer.png'
import './landingPage.css';

function LandingPage () {
    const currentUser = useSelector((state) => state.session.user);

    if (currentUser) return <Redirect to={`/profile/${currentUser.id}`} />

    return (
        <div id='landing-page-container'>
            <video controlsList="nodownload nofullscreen noremoteplayback" muted autoPlay loop id='landing-page-video' poster="http://dummyimage.com/320x240/ffffff/fff">
                <source src={welcomeVideo} type = 'video/mp4'/>
            </video>
        <div className='landing-page-flex-item' id='landing-page-row-1'>
            <img src={djImage} alt='woman holding a record in her hand wearing headphones, preparing to start djing.' id='landing-page-image-1'>
            </img>
            <div id='landing-page-textbox'>
                <h3 id='landing-page-subtitle'>Artist? Engineer? #1 Fan?</h3>
                <p id='landing-page-subinfo'>If You Are Any Part Of The Music Industry Then This Is The Place For You! Welcome To The Revolution!</p>
            </div>
            </div>
        <div className='landing-page-flex-item'>
            <div id='landing-page-textbox'>
                <h3 id='landing-page-subtitle'>Come See Up and Coming Musicians Perform At Their Best!</h3>
                <p id='landing-page-subinfo'>Live Events, Close Sessions, and Close Connections Made With Musicians Around The World</p> </div>
            <img src = {guitarPlayer} alt='young boy playing a guitar on an empty sidewalk' id='landing-page-image-2'></img>
        </div>

        <div className='landing-page-flex-item' id='landing-page-last'>
            <img src={engineer} alt='young man on a computer, mixing audio files, inside a recording studio' id='landing-page-image-3'></img>
            <div id='landing-page-textbox'>
                <h3 id='landing-page-subtitle'>Audio Engineer Looking To Make Your Name?</h3>
                <p id='landing-page-subinfo'>Start An Engineer's Account To Begin Booking Live Sessions And Get Your First Taste Of The Industry!</p>
                <NavLink exact to='/signup'><button id='landing-page-signup-button'>Continue To Signup... ➡️</button></NavLink>
            </div>
            </div>
            <hr id='landing-page-hr-1'></hr>
            <h2 id='landing-page-purpose-statement-title'>Applause Purpose Statement</h2>
            <p id='landing-page-purpose-statement'>Here at Applause we are dedicated to one thing, the true joy that music brings where ever it goes. Much like many of you, music inspires us. It has been apart of the history of this world for as long as we have records. The legacy of music is deep in the roots of humanity, and with it comes a longing for an ever changing sound. It is our simple aim to be a conduit for the joy and inspiration that music continues to inspire across the generations that are soon to come, and the sounds that will soon come with them.</p>




        </div>
    )
}

export default LandingPage;
