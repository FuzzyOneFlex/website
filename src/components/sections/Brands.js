import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

import { ReactComponent as AureconLogo } from '@images/logos/aurecon.svg';
import { ReactComponent as AutocadLogo } from '@images/logos/autocad.svg';
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


const LOGOS = [
  {
    logo: AureconLogo,
    link: 'https://www.aurecongroup.com/',
  },
  {
    logo: AutocadLogo,
    link: 'https://www.autodesk.com/products/autocad/overview',
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
    logo: WhoLogo,
    link: 'https://www.who.int/',
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
    logo: JllLogo,
    link: 'https://www.us.jll.com/',
  },
  {
    logo: OracleLogo,
    link: 'https://www.oracle.com/',
  },
  {
    logo: VentiaLogo,
    link: 'https://www.ventia.com/',
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
      <Section id="brands" accent>
          
            <h1 style={mystyle}>Partners</h1>
            <LogoGrid>
              {LOGOS.map(({ logo, link }) => (
                <ExternalLink key={link} href={link}>
                  {logo()}
                </ExternalLink>
              ))}
            </LogoGrid>
         
      </Section>
    )}
  />
);


const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr;
  grid-gap: 40px;
  justify-items: center;
  align-items: center;
  padding-right: 50px;
  padding-left: 50px;
  margin-bottom: 10px;
  margin-top: 30px;
  a {
    svg {
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${props => props.theme.screen.md}) {
    justify-content: center;
  }
`;

const Art = styled.figure`
  width: 600px;
  position: absolute;
  top: -12%;
  right: 50%;

  @media (max-width: ${props => props.theme.screen.lg}) {
    top: 0;
    right: 65%;
    width: 500px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    display: none;
  }
`;

export default UsedBy;
