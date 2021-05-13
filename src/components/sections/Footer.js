import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

import GithubIcon from '@static/icons/github.svg';
import InstagramIcon from '@static/icons/instagram.svg';
import TwitterIcon from '@static/icons/twitter.svg';
import RedditIcon from '@static/icons/reddit.svg';
import TelegramIcon from '@static/icons/telegram.svg';
import LinkedinIcon from '@static/icons/linkedin.svg';

import biglogo from './biglogo.svg';
import { Section2 } from '@components/global';

const SOCIAL = [
  {
    icon: TwitterIcon,
    link: 'https://twitter.com/FuzzyOne10',
  },
  {
    icon: RedditIcon,
    link: 'https://www.reddit.com/r/fuzzyone/',
  },
  {
    icon: GithubIcon,
    link: 'https://github.com/FuzzyOneFlex',
  },
  {
    icon: TelegramIcon,
    link: 'https://t.me/Fuzzy_One',
  },

  {
    icon: LinkedinIcon,
    link: 'https://www.linkedin.com/company/fuzzyone/mycompany/',
  },
  {
    icon: InstagramIcon,
    link: 'https://www.instagram.com/fuzzyflex/',
  },
 
];

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "fuz2" }
        ) {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      
      <Section2 id="footer" accent="secondary">
        
        <Art><img src={biglogo}/></Art>
        <FooterWrapper>
          
          <StyledContainer>
            
            <Copyright>
                COPYRIGHT © FUZZY.ONE 2021 ALL RIGHTS RESERVED.
                <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Copyright>
            
            <SocialIcons>
              {SOCIAL.map(({ icon, link }) => (
                <ExternalLink key={link} href={link}>
                  <img src={icon} alt="link" />
                </ExternalLink>
              ))}
            </SocialIcons>
          </StyledContainer>
        </FooterWrapper>
      </Section2>
    )}
  />
);

const SocialIcons = styled.div`
  display: flex;

  img {
    margin: 0 8px;
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.footer`
  
  padding-top: 120px;
  padding-bottom: 10px;
  background-image: url("./wave.svg") ;
  // background-size: auto;
`;

const Copyright = styled.div`
  font-family: ${props => props.theme.font.primary};
  ${props => props.theme.font_size.smaller};
  color: ${props => props.theme.color.black.regular};

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Art = styled.figure`
display: flex;
justify-content: space-between;
align-items: center;
align-self: center;
margin-left: 800px;
img {
 
  width: 50%;
  height: 50%;
}
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  @media (max-width: ${props => props.theme.screen.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

export default Footer;
