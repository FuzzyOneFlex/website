import React from 'react';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
 import { Section, Container } from '@components/global';
 
const Roadmap = () => ( 
<Section id="roadmap" accent="secondary">
  <Container style={{ position: 'relative' }}>
  <h1>Roadmap</h1>
<Timeline lineColor={'#ddd'}>

  <TimelineItem
    key="001"
    dateText="May 2021"
    dateInnerStyle={{ 

    background: '#55C645', 
    textAlign: 'center' 
    
  }}
  dateComponent={(
    <div
      style={{
        display: 'block',
        float: 'right',
        color: '#fff',
        fontSize: '25px',
        marginRight: '50px'
      }}
    >
      May 2021
    </div>
  )}

   bodyContainerStyle={{
      display:'block',
      background: '#ddd',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
    }}
    style={{ color: '#55C645' }}
  >
    <h3 style={{ color: '#55C645' }}>Create FUZ Token</h3>
    <h4>Solana Network Token</h4>
    <p>
     Add the new token and initial dApps and blablabla
    </p>
  </TimelineItem>




  <TimelineItem
    key="002"
    dateText="June 2021"

    dateInnerStyle={{ 

    background: '#55C645', 
    fontFamily: 'Courier', 
    textAlign: 'center' 

    }}
    dateComponent={(
      <div
        style={{
          display: 'block',
          float: 'right',
          color: '#fff',
          fontSize: '25px',
          marginRight: '50px'
        }}
      >
        June 2021
      </div>
    )}
  >
    <h3 style={{ color: '#55C645' }}>Add the registration module</h3>
    <h4 style={{ color: '#999999' }} >Subtitle</h4>
    <p style={{ color: '#ffffff' }}>
      something about the registration module. short description.
    </p>
  </TimelineItem>




    <TimelineItem
    key="003"
     dateInnerStyle={{ 

    background: '#55C645', 
    fontFamily: 'Courier', 
    textAlign: 'center' 

  }}
  dateComponent={(
    <div
      style={{
        display: 'block',
        float: 'right',
        color: '#fff',
        fontSize: '25px',
        marginRight: '50px'
      }}
    >
      June 2021
    </div>
  )}
  dateText="June 2021"
  
  >
    <h3 style={{ color: '#55C645' }}>Add the Q&A</h3>
    <h4 style={{ color: '#999999' }} >Q&A elements</h4>
    <p style={{ color: '#ffffff' }}>
      something about the q&a. short description.
    </p>
  
  </TimelineItem>



  <TimelineItem
    key="004"
     dateInnerStyle={{ 

    background: '#55C645', 
    fontFamily: 'Courier', 
    textAlign: 'center' 

  }}
  dateComponent={(
    <div
      style={{
        display: 'block',
        float: 'right',
        color: '#fff',
        fontSize: '25px',
        marginRight: '50px'
      }}
    >
      July 2021
    </div>
  )}
  dateText="July 2021"
  >
    <h3 style={{ color: '#55C645' }}>Add the DeFi mechanisms</h3>
    <h4 style={{ color: '#999999' }} >Staking, Farming, Swapping</h4>
    <p style={{ color: '#ffffff' }} >
      something about the defi mechanisms. short description. short description. short description. short description. short description. short description. short description. 
    </p>
  
  </TimelineItem>
  




   <TimelineItem
    key="005"
     dateInnerStyle={{ 

    background: '#55C645', 
    fontFamily: 'Courier', 
    textAlign: 'center' 

  }}
  dateComponent={(
    <div
      style={{
        display: 'block',
        float: 'right',
        color: '#fff',
        fontSize: '25px',
        marginRight: '50px'
      }}
    >
      August 2021
    </div>
  )}
  dateText="August 2021"
  >
    <h3 style={{ color: '#55C645' }}>Add the Fuzzy Logic</h3>
    <h4 style={{ color: '#999999' }} >Fuzzy logic</h4>
    <p style={{ color: '#ffffff' }} >
      something about the fuzzylogic. short description.short description. short description. short description. short description. short description. short description. short description. short description. short description. short description. short description. 
    </p>
  
  </TimelineItem>

  <TimelineItem
    key="006"
     dateInnerStyle={{ 

    background: '#55C645', 
    fontFamily: 'Courier', 
    textAlign: 'center' 

  }}
  dateComponent={(
    <div
      style={{
        display: 'block',
        float: 'right',
        color: '#fff',
        fontSize: '25px',
        marginRight: '50px'
      }}
    >
      September 2021
    </div>
  )}
  dateText="September 2021"
  >
    <h3 style={{ color: '#55C645' }}>Full roll out</h3>
  
  
  </TimelineItem>

</Timeline>
</Container>
</Section>
);
export default Roadmap;