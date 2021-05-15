import React from 'react';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
 import { Section, Container } from '@components/global';
 import IconButton from '@material-ui/core/IconButton';
 import AttachFileIcon from '@material-ui/icons/AttachFile';
 import pdf from '../../images/roadmap.pdf'
 import './Roadmap.css'
 
const Roadmap = () => ( 
<Section id="roadmap" accent="secondary">
  <Container style={{ position: 'relative' }}>
  <h1>Roadmap  <IconButton><a style={{ color:'#4AA63D'}} component="span" fontSize="large" href={pdf} target = "_blank" rel="noreferrer"> <AttachFileIcon /></a> </IconButton></h1> 
 
  
<Timeline lineColor={'#ddd'}>

    <TimelineItem
    key="001"
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
          marginRight: '30px'
        }}
      >
        06.2021
      </div>
    )}

    dateText="06.2021"
  >
    <h3 style={{ color: '#55C645' }}>Create the new FUZ token</h3>
    <p style={{ color: '#ffffff' }}>
    The new token is based on the Solana Blockchain. It will have 
    a total supply of 10 million tokens at 8 decimal places.
    </p>
  </TimelineItem>



  <TimelineItem
    key="002"
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
        marginRight: '30px'
      }}
    >
       06.2021
    </div>
  )}
  dateText=" 06.2021"
  >
    <h3 style={{ color: '#55C645' }}>Exchange old FLEx with FUZ</h3>
    <p style={{ color: '#ffffff' }} >
    We will enable FLEx users to exchange their FLEx tokens with FUZ tokens
    at an exchange rate of 1,000 FLEx to 1 FUZ. The tokens will be staked
    for 3 months after exchange.
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
        marginRight: '30px'
      }}
    >
      07.2021
    </div>
  )}
  dateText="07.2021"
  >
    <h3 style={{ color: '#55C645' }}>Complete the Q&A Module</h3>
    <p style={{ color: '#ffffff' }} >
    The Q&A Module is the core of Fuzzy.One. This module includes a fast step
    wise process that helps the user ask the question leading them to
    receive the correct answers.
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
        marginRight: '30px'
      }}
    >
      07.2021
    </div>
  )}
  dateText="07.2021"
  >
    <h3 style={{ color: '#55C645' }}>Integrate the Wallet</h3>
    <p style={{ color: '#ffffff' }} >
    We are creating a simple Solana based wallet.
    It will be a simple Solana wallet which will enable registered
    users to transfer the tokens out of the site wallet and into a private wallet.  
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
        marginRight: '30px'
      }}
    >
      08.2021
    </div>
  )}
  dateText="08.2021"
  >
    <h3 style={{ color: '#55C645' }}>Integrate the DeFi dApps</h3>
    <p style={{ color: '#ffffff' }} >
    We will create a number of blockchain based DeFi solutions to provide
    a comprehensive suite of cryptocurrency apps.
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
          marginRight: '30px'
        }}
      >
        09.2021
      </div>
    )}
    dateText="09.2021"
    >
      <h3 style={{ color: '#55C645' }}>Complete the ML/AI search engine</h3>
      <p style={{ color: '#ffffff' }} >
      The Q&A library combined with the article repository will be searchable
      via a unique fuzzy logic-based AI. Together with ML algorithms, the
      search engine will speed up the accuracy for finding answers to questions
      that are like the ones being asked.
        </p>
    
    </TimelineItem>
</Timeline>

</Container>

</Section>

);
export default Roadmap;