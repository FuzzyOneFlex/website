import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import styled from 'styled-components';
import classes from './BackgroundVideo.module.css';
import './Header.css';
import myVideo from '../../images/art/video.mp4';

const Header = () => {
  
  
    return (
    <div className={classes.Container} id='home'>
        
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video}>
            <source src={myVideo} type="video/mp4" />
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                  <Intro>Fuzzy.One</Intro> 
                  <br/>
                  <Intro2>A supply chain information platform <br /> using Return on Knowledge</Intro2>
                  <br/><br/>
                
                  <Rotate><ReactRotatingText items={['We pay you for answering questions.', 'The more you know, the more you earn.']}/></Rotate>
                </div>
            </div>
    </div>
    );
  }



const Intro = styled.span`
  margin: 40px auto;
  font-size: 80px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 5px;
  text-shadow: 3px 4px 7px rgba(0,0,0,0.8);
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-weight: bold;
  margin-bottom: 40px;
  @media (max-width: ${props => props.theme.screen.md}) {
    font-size: 50px;
    // padding: 96px 0;
  }
  @media (max-width: ${props => props.theme.screen.sm}) {
    font-size: 30px;
    // padding: 96px 0;
  }
`;

const Intro2 = styled.span`
  margin: 40px auto;
  font-size: 50px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 5px;
  text-shadow: 3px 4px 7px rgba(0,0,0,0.8);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -1px;
  color: white;
  font-weight: bold;
    @media (max-width: ${props => props.theme.screen.md}) {
      font-size: 20px;
    }
    @media (max-width: ${props => props.theme.screen.sm}) { 
      margin: 0px;
      font-size: 15px;
      // padding: 96px 0;
    }
`;

const Rotate = styled.span`
  margin: 40px auto;
  font-size: 40px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 5px;
  // text-shadow: 3px 4px 7px rgba(0,0,0,0.8);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -1px;
  color: white;
  // font-weight: bold;
    @media (max-width: ${props => props.theme.screen.md}) {
      font-size: 20px;
    }
    @media (max-width: ${props => props.theme.screen.sm}) { 
      margin: 0px;
      font-size: 15px;
      // padding: 96px 0;
    }
`;





export default Header;
