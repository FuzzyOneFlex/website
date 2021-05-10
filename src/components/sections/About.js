import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';
import { AnimationWrapper } from 'react-hover-animation'
const About = () => (
  <StaticQuery
    query={graphql`
      query {
        art_fast: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "qa_grey" }

        ) {
          childImageSharp {
            fluid(maxWidth:  700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_learn: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "solution_grey" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_ideas: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "mall_grey" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="about" accent="secondary">
        <Container>
          <Grid>
            <div>
             <AnimationWrapper><h2>Q&A Platform</h2></AnimationWrapper>
              <p style={{color:"white"}}>
                A free open-to-all platform for expert reviewed answered to situation specific/customized questions.
              </p>
            </div>
            <Art>
              <Img fluid={data.art_fast.childImageSharp.fluid} />
            </Art>
          </Grid>
          <Grid inverse>
            <Art>
              <Img fluid={data.art_learn.childImageSharp.fluid} />
            </Art>
            <div>
              <AnimationWrapper><h2>Solution Repository</h2></AnimationWrapper>
              <p style={{color:"white"}}>
                A global solution repository comprised of informative and knowledge-oriented articles writte by SC veterans and experts.
              </p>
            </div>
          </Grid>
          <Grid>
            <div>
              <AnimationWrapper><h2>Fuzzy Mall</h2></AnimationWrapper>
              <p style={{color:"white"}}>
                Global online marketplace for Supply chain companies & service providers to connect and execute smooth trade with each other.
                <br />
              </p>
            </div>
            <Art>
              <Img fluid={data.art_ideas.childImageSharp.fluid} />
            </Art>
          </Grid>
        </Container>
      </Section>
    )}
  />
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 40px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 24px 0;

  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    margin-bottom: 96px;

    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: 220px;
  width: 100%;
`;

export default About;
