import ExternalLink from '@common/ExternalLink';
import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import styled from 'styled-components';
import classes from './BackgroundVideo.module.css';
import './ReactRotatingText.css';
import './Header.css';
import myVideo from './video.mp4';


const Header = () => (
<div className={classes.Container} id='home'>
          <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
              <source src={myVideo} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          <div className={classes.Content}>
              <div className={classes.SubContent} >
              <Intro>Fuzzy.One</Intro> 
              <br/>
               <Intro2>A supply chain information platform <br />
               using Return on Knowledge
               </Intro2>
             <br /><br />
            <h2><ReactRotatingText items={['We pay you for answering questions.', 'The more you know, the more you earn.']} /></h2>
              </div>
          </div>
      </div>
);

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
`;




const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.color.black.regular};
  }
`;



export default Header;
