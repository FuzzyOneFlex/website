import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';
import GithubIcon from '@static/icons/github.svg';
import InstagramIcon from '@static/icons/instagram.svg';
import TwitterIcon from '@static/icons/twitter.svg';
import RedditIcon from '@static/icons/reddit.svg';
import TelegramIcon from '@static/icons/telegram.svg';
import LinkedinIcon from '@static/icons/linkedin.svg';
import Wave from 'react-wavify'


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
      
      <Section3 id="footer3" accent="secondary">
        <Wave style={{height:"500px", paddingTop:"30px"}} fill="#4AA63D" mask="url(#mask)" 
        options={{ 
          points: 3000, 
          speed: 0.2, 
          amplitude: 400, 
          height: 0}}>
          <mask id="mask" >
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="300pxt" height="311.000000pt" viewBox="0 0 300.000000 311.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,311.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M1788 3080 c102 -37 237 -116 386 -229 192 -145 296 -233 367 -307
            249 -264 322 -621 199 -981 -33 -97 -32 -85 7 57 33 123 37 307 9 415 -63 243
            -219 431 -461 553 -79 39 -401 155 -524 189 -135 36 -338 39 -455 5 -225 -65
            -404 -215 -515 -431 -42 -83 -135 -327 -184 -486 -106 -340 -33 -666 199 -886
            114 -107 225 -167 469 -254 265 -94 363 -122 235 -66 -128 56 -363 190 -463
            264 -174 128 -280 339 -280 557 0 119 20 199 78 315 78 157 170 242 449 409
            257 155 411 201 593 178 313 -40 539 -253 605 -571 29 -140 31 -550 4 -666
            -34 -149 -113 -286 -218 -381 -60 -54 -19 -32 53 28 69 58 144 155 199 259 60
            114 66 111 9 -4 -103 -204 -232 -339 -415 -434 -188 -98 -358 -122 -749 -105
            -286 13 -385 28 -522 81 -225 88 -417 280 -518 521 -66 157 -179 567 -195 710
            -25 218 29 441 151 621 92 138 215 244 494 429 77 51 145 97 150 103 24 24
            -378 -210 -465 -271 -245 -173 -388 -383 -452 -666 -17 -77 -21 -137 -25 -397
            -6 -325 3 -454 37 -589 49 -192 129 -330 274 -476 114 -113 208 -179 480 -334
            207 -119 321 -170 455 -207 84 -23 115 -26 251 -26 136 0 167 3 253 26 130 35
            243 86 440 198 306 175 396 237 506 349 165 169 262 378 291 628 17 145 8 722
            -13 817 -64 289 -216 513 -462 681 -106 72 -383 233 -510 296 -90 45 -231 99
            -257 97 -7 0 11 -9 40 -19z m901 -1679 c-6 -18 -13 -30 -15 -28 -2 2 1 18 7
            36 6 18 13 30 15 28 2 -2 -1 -18 -7 -36z" fill="white"/>
            <path d="M1395 1990 c-18 -7 -17 -9 10 -19 184 -69 234 -122 306 -327 37 -106
            42 -129 43 -214 1 -83 -2 -102 -26 -152 -77 -165 -262 -259 -448 -228 -187 32
            -336 172 -380 359 -16 66 -8 209 14 270 9 24 14 46 12 48 -9 10 -68 -86 -88
            -146 -19 -54 -23 -87 -23 -181 0 -115 0 -115 42 -203 72 -149 155 -237 308
            -330 61 -36 266 -107 388 -133 250 -52 493 45 630 254 129 195 135 430 16 627
            -51 86 -166 188 -263 235 -97 46 -351 126 -444 140 -77 11 -71 11 -97 0z" fill="white"/>
            </g>
            </svg>
          </mask>
        </Wave>

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
      </Section3>
    )}
  />
);

const SocialIcons = styled.div`
  display: flex;

  img {
    margin: 0 8px;
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.footer`
  
  padding-top: 120px;
  padding-bottom: 10px;
  background-image: url("./wave.svg") ;
  // background-position: bottom;
  // background-size: auto;
  @media (max-width: ${props => props.theme.screen.sm}) {
    background-repeat: repeat-x;
    background-height: 200px;
    padding-top: 0px;
    background-position: bottom;
    background-attachment: fixed;
    background-size: cover;
  }
  @media (max-width: ${props => props.theme.screen.md}) {
    background-repeat: repeat-x;
    background-height: 200px;
    padding-top: 0px;
    background-position: bottom;
    background-attachment: fixed;
    background-size: cover;
  }
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




export const Section3 = styled.section` 
//  overflow: hidden;
  @media (max-width: ${props => props.theme.screen.md}) {
    // padding: 96px 0;
  }



  ${props =>
    props.accent &&
    `background-color: ${
      props.accent === 'secondary'
        ? props.theme.color.black.pitch
        : props.theme.color.primary
    }`};

  ${props =>
    props.accent &&
    `color: ${
      props.accent === 'secondary'
        ? props.theme.color.primary
        : props.theme.color.white.regular
    }`};
`;


export default Footer;