import React from "react";

import { Container, Section } from '@components/global';
import "./card.css"


import { ReactComponent as ian } from '@images/logos/people/ian.svg';
import { ReactComponent as mohan } from '@images/logos/people/mohan.svg';
import { ReactComponent as sameer } from '@images/logos/people/sameer.svg';
import { ReactComponent as giorgos } from '@images/logos/people/giorgos.svg';
import { ReactComponent as nechesov } from '@images/logos/people/nechesov.svg';
import { ReactComponent as nitin } from '@images/logos/people/nitin.svg';
import { ReactComponent as mushtaq } from '@images/logos/people/mushtaq.svg';
import { ReactComponent as marjorie } from '@images/logos/people/marjorie.svg';
import { ReactComponent as carla } from '@images/logos/people/carla.svg';
import { ReactComponent as liezel } from '@images/logos/people/liezel.svg';
import { ReactComponent as rakib } from '@images/logos/people/rakib.svg';
import { ReactComponent as tingxiao } from '@images/logos/people/tingxiao.svg';


import ExternalLink from '@common/ExternalLink';
import styled from 'styled-components';


const EXEC = [
  {
    logo: ian,
    link: 'https://www.linkedin.com/in/iankano/',
  },
  {
    logo: mohan,
    link: 'https://www.linkedin.com/in/mohan-devsam-2b25b070/',
  },
  {
    logo: sameer,
    link: 'https://www.linkedin.com/in/sameer-bakhru-cfa-b8b213138/',
  },

];

const DEV = [
  {
    logo: giorgos,
    link: 'https://www.linkedin.com/in/ganagno/',
  },
  {
    logo: mushtaq,
    link: 'https://www.linkedin.com/in/mushtaqnaik/',
  },
  {
    logo: nechesov,
    link: 'https://www.linkedin.com/in/mohan-devsam-2b25b070/',
  },
  {
    logo: nitin,
    link: 'https://www.linkedin.com/in/nitin-arora-b4a74287/',
  },
  {
    logo: tingxiao,
    link: 'https://www.upwork.com/o/profiles/users/~012a3921fbc0f52a93/',
  },

];

const ACADEMIC = [
  {
    logo: marjorie,
    link: 'https://www.linkedin.com/in/marjorie-rola-9580311/',
  },
  {
    logo: carla,
    link: 'https://www.linkedin.com/in/carla-negr%C3%A3o-08b36834/',
  },

];

const COMMUNITY = [
  {
    logo: liezel,
    link: 'https://www.linkedin.com/in/liezel-baliguat-6387471a7/',
  },
  {
    logo: rakib,
    link: 'https://www.linkedin.com/in/rakib-sikdar-30b476196/',
  },

];


class Card2 extends React.Component {
  render() {
    return(
  <div class="wrapper">
    <div class="cols">
        
        
        <div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
            <div class="front" style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` 
          }}>
              <div class="inner">
                <p>Executive Team</p>
                <span>We are the chairmans</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
              <TeamGrid>
              {EXEC.map(({ logo, link }) => (
                <ExternalLink key={link} href={link} target={"_blank"}>
                  {logo()}
                </ExternalLink>
              ))}
            </TeamGrid>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
            <div class="front" style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")` 
          }}>
              <div class="inner">
                <p>Developer Team</p>
                <span>We are the builders</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
              <TeamGrid>
              {DEV.map(({ logo, link }) => (
                <ExternalLink key={link} href={link} target={"_blank"}>
                  {logo()}
                </ExternalLink>
              ))}
            </TeamGrid>
              </div>
            </div>
          </div>
        </div>

        <div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
            <div class="front" style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/828764/pexels-photo-828764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` 
          }}>
              <div class="inner">
                <p>Academic Team</p>
                <span>We are the thinkers</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
              <TeamGrid>
              {ACADEMIC.map(({ logo, link }) => (
                <ExternalLink key={link} href={link} target={"_blank"}>
                  {logo()}
                </ExternalLink>
              ))}
            </TeamGrid>
              </div>
            </div>
          </div>
        </div>

        <div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
            <div class="front" style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/209728/pexels-photo-209728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` 
          }}>
              <div class="inner">
                <p>Community Team</p>
                <span>We are the supporters</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
              <TeamGrid>
              {COMMUNITY.map(({ logo, link }) => (
                <ExternalLink key={link} href={link} target={"_blank"}>
                  {logo()}
                </ExternalLink>
              ))}
            </TeamGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
  }
}




class App extends React.Component {
  render() {
    return (
      <>
      <Section id="team" accent="secondary">
        <Container style={{ position: 'relative' }}>
        <h1>The Team</h1><br/><br/><br/><br/>
        <Card2/>
        </Container>
      </Section> 
      </>
    )
  }
}

const TeamGrid = styled.div`
  display: grid;
  
  grid-template-columns: 2fr 2fr;
  grid-gap: 3px;
  justify-items: center;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 0px;
  margin-top: 0px;
  overflow: visible;
  a {
    svg {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      display: inline-block;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    grid-template-columns: 1fr;
  }
`;

export default App;
