import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Section, Container } from '@components/global';


const About = () => (
  <StaticQuery
    query={graphql`
      query {

        qa: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "qa_g" }
        ) {
          childImageSharp {
            fluid(maxWidth:  700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        solution: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "solution_g" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        mall: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "mall_g" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
    
        solana: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "solana" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
    
        lang: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "translation" }

        ) {
          childImageSharp {
            fluid(maxWidth:  700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        bitcoin: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "crypto_barrier" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        global: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "global" }
        ) {
          childImageSharp {
            fluid(maxWidth: 700, maxHeight: 700) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        productivity: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "productivity" }
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
      <div id="about">
      <Section id="about1" accent="secondary">
        <Container>
          <h1>What is Fuzzy.One</h1>
          <Grid>
            <div>
             <h2 style={{color: "#55C645"}}>Q&A Platform</h2>
              <p style={{color:"white"}}>
              We break down the language barrier; you can ask and answer
              every question in your own language. We provide focus; our
              system breaks down this issue by using internal fuzzy logic
              and focusing on helping people on how to ask. We provide an urgency
              selector, where the requestor selects how fast they want the response.
              We pay for the answers; every answer gets paid a base rate. Urgent
              questions create a bonus.  
              </p>
            </div>
            <Art>
              <Img fluid={data.qa.childImageSharp.fluid} />
            </Art>
          </Grid><br/>
          
          <Grid inverse>
            <Art>
              <Img fluid={data.solution.childImageSharp.fluid} />
            </Art>
            <div>
              <h2 style={{color: "#55C645"}}>Solution Repository</h2>
              <p style={{color:"white"}}>
              A global solution repository comprised of informative and knowledge-oriented
              articles written with experience. An indexed searchable library
              of pre-validated solutions, designed to solve similar and unique issues. 
              Validated solutions with quantifiable outcomes. 
              </p>
            </div>
          </Grid><br/>

          <Grid>
            <div>
              <h2 style={{color: "#55C645"}}>Fuzzy Mall</h2>
              <p style={{color:"white"}}>
              Global online marketplace for Supply Chain companies
              & service providers to connect and execute smooth trade with each other.
              <br/>
              </p>
            </div>
            <Art>
              <Img fluid={data.mall.childImageSharp.fluid} />
            </Art>
          </Grid><br/>
          
          <Grid inverse>
            <Art>
              <Img fluid={data.solana.childImageSharp.fluid} />
            </Art>
            <div>
              <h2 style={{color: "#55C645"}}>Solana Blockchain</h2>
              <p style={{color:"white"}}>
              Solana is a fast, secure, and censorship-resistant blockchain. <br/>
              It is also an easy blockchain to link up to and will provide an
              inexpensive, fast and secure environment for our global community.
              </p>
            </div>
          </Grid>
        </Container>

      </Section>
       <Section id="about2" accent="primary">
       <Container>
         <h1>Why use Fuzzy.One</h1>
         <Grid>
            <div>
              <h2 >Break down the language barrier</h2>
              <p style={{color:"black"}}>
              We enable everyone to post Q&As in their language so that localized
              professionals can respond in the same language, removing the English
              barrier that predominate the internet.
              </p>
            </div>
            <Art>
              <Img fluid={data.lang.childImageSharp.fluid} />
            </Art>
         </Grid><br/>

         <Grid inverse>
           <Art>
             <Img fluid={data.bitcoin.childImageSharp.fluid} />
           </Art>
           <div>
             <h2>Break down the cryptocurrency barrier</h2>
              <p style={{color:"black"}}>
              We use cryptocurrency as an intermediary payment form, where rewards
              are paid for in full, and the users can then convert or exchange 
              their tokens with Fiat on our dApp (Fuzzy Swap) page
              in the app and on the site.
              </p>
           </div>
         </Grid><br/>
         
         <Grid>
           <div>
             <h2>Break down the Globalization Barriers</h2>
              <p style={{color:"black"}}>
              Offering localised Q&As. In other words, you do not need to ask
              a question that is not focused on your location. If you need help
              locally, you can ask a question that includes your town/city. 
              If you need help nationally, you can include your country; if you
              need generic help that is not local or national, you ask a global
              question without a city or country.
             </p>
           </div>
           <Art>
             <Img fluid={data.global.childImageSharp.fluid} />
           </Art>
         </Grid><br/>

         <Grid inverse>
           <Art>
             <Img fluid={data.productivity.childImageSharp.fluid} />
           </Art>
           <div>
            <h2>Break down the Urgency & Quality barrier</h2>
            <p style={{color:"black"}}>
            One of the biggest issues is knowing how to ask. Our system breaks down this
            issue by using internal fuzzy logic and focusing on helping people on how to ask.
            Sometimes, people want immediate answers. In other cases, they don't. We provide
            an urgency selector, where the requestor selects how fast they want the response.
             </p>
           </div>
         </Grid>
       </Container>
     </Section>
     </div>
    )}
  />
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 80px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 40px 0;

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
  max-width: 250px;
  width: 100%;
`;


export default About;
