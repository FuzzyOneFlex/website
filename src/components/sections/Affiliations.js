import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import ExternalLink from '@common/ExternalLink';
import { ReactComponent as AureconLogo } from '@images/logos/aurecon.svg';
import { ReactComponent as AutodeskLogo } from '@images/logos/autodesk.svg';
import { ReactComponent as BoeingLogo } from '@images/logos/boieng.svg';
import { ReactComponent as BroadspectrumLogo } from '@images/logos/broadspectrum.svg';
import { ReactComponent as CitibankLogo } from '@images/logos/citibank.svg';
import { ReactComponent as CiltLogo } from '@images/logos/cilt.svg';
import { ReactComponent as HeinzLogo } from '@images/logos/heinz.svg';
import { ReactComponent as JllLogo } from '@images/logos/jll.svg';
import { ReactComponent as OracleLogo } from '@images/logos/oracle.svg';
import { ReactComponent as VentiaLogo } from '@images/logos/ventia.svg';
import { ReactComponent as WhoLogo } from '@images/logos/who.svg';
import { ReactComponent as GrandLogo } from '@images/logos/grand.svg';

import { AnimationWrapper } from 'react-hover-animation'
const LOGOS = [
  {
    logo: AureconLogo,
    link: 'https://www.aurecongroup.com/',
  },
  {
    logo: AutodeskLogo,
    link: 'https://www.autodesk.com/',
  },
  {
    logo: BoeingLogo,
    link: 'https://www.boeing.com/',
  },
  {
    logo: BroadspectrumLogo,
    link: 'https://mobile.broadspectrum.com/',
  },
  {
    logo: CitibankLogo,
    link: 'https://www.citi.com/',
  },
  {
    logo: CiltLogo,
    link: 'https://www.ciltinternational.org/',
  },
  {
    logo: HeinzLogo,
    link: 'https://www.heinz.com/',
  },
   {
    logo: OracleLogo,
    link: 'https://www.oracle.com/',
  },
  {
    logo: JllLogo,
    link: 'https://www.us.jll.com/',
  },

  {
    logo: VentiaLogo,
    link: 'https://www.ventia.com/',
  },
  {
    logo: WhoLogo,
    link: 'https://www.who.int/',
  },
  {
    logo: GrandLogo,
    link: 'https://www.grantthornton.com/',
  },
 
];

 const mystyle = {
  
      textAlign: "center",
      color:"white",
      marginTop: "-40px"
    };

const UsedBy = () => (
  <StaticQuery
    query={graphql`
      query {
        art_story: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "tell_story" }
        ) {
          childImageSharp {
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section3 id="affiliations" accent>
            <h1 style={mystyle}>Affiliations </h1>
            <LogoGrid>
              {LOGOS.map(({ logo, link }) => (
              <AnimationWrapper>
                <ExternalLink key={link} href={link} target={"_blank"}>
                  {logo()}
                </ExternalLink>
                </AnimationWrapper>
              ))}
            </LogoGrid>
      </Section3>
    )}
  />
);


const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-gap: 5px;
  justify-items: center;
  align-items: center;
  padding-right: 30px;
  padding-left: 30px;
  margin-bottom: 0px;
  margin-top: 20px;
  overflow: visible;
  a {
    svg {
      width: 70%;
      height: 70%;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    align-items: left;
    padding-right: 0px;
    // padding-left: 60px;
    grid-template-columns: 4fr 4fr 4fr;
    a {
      svg {
        width: 70%;
        height: 70%;
      }
    }
  }
`;



export const Section3 = styled.section` 
 overflow: hidden;
  padding-top: 60px;
  padding-bottom: 10px;
  overflow: hidden;
  width: 100%;
  @media (max-width: ${props => props.theme.screen.md}) {
    padding: 96px 0;
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

export default UsedBy;
