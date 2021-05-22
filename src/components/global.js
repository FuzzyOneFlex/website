import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  float: center;
  @media (min-width: ${props => props.theme.screen.xxs}) {
    max-width: 350px;
  }

  @media (min-width: ${props => props.theme.screen.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${props => props.theme.screen.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    max-width: 960px;
  }

  @media (min-width: ${props => props.theme.screen.lg}) {
    max-width: 1440px;
  }

  ${props =>
    props.fluid &&
    `
    max-width: 1200px !important;
  `};
`;

export const Section = styled.section`
  padding: 96px 0;
  overflow: hidden;
  width: 100%;
  @media (max-width: ${props => props.theme.screen.lg}) {
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


export const Section2 = styled.section` 
 overflow: hidden;
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


