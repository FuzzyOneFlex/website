import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactCardCarousel from "react-card-carousel";
import { Container,Section2 } from '@components/global';
class MyCarousel extends Component {
  static get CONTAINER_STYLE() {
    return {
      position: "relative",
      height: "600px",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "middle",
      background: "#141414"
    };
  }

  static get CARD_STYLE() {
    return {
      height: "300px",
      width: "300px",
      paddingTop: "80px",
      textAlign: "center",
      background: "#55C645",
      color: "#FFF",
      fontFamily: "Arial",
      fontSize: "25px",
      textTransform: "uppercase",
      borderRadius: "10px",
      boxSizing: "border-box"
    };
  }

  render() {
    return (
      <Section2 id='team' accent='secondary'> 
      <Container style={{ position: 'relative' }}>
      <h1> The Team </h1>
      <div style={MyCarousel.CONTAINER_STYLE}>
        <ReactCardCarousel autoplay={true} autoplay_speed={4500}>
          <div style={MyCarousel.CARD_STYLE}>Executive Team</div>
          <div style={MyCarousel.CARD_STYLE}>Academic Team</div>
          <div style={MyCarousel.CARD_STYLE}>Developer Team</div>
          <div style={MyCarousel.CARD_STYLE}>Community Team</div>
        </ReactCardCarousel>
      </div>
      </Container>
      </Section2>
    );
  }
}

export default MyCarousel;
