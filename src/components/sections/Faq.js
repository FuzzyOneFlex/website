import React from 'react';
import { Section, Container } from '@components/global';
import FaqItem from '@common/FaqItem';


const FAQS = [
  {
    title: 'What is the problem we are trying to solve?',
    content: () => (
      <>
      We are providing exponential quality and speed of information – 
      removing false and fake results, the speed at which validated 
      solutions are reached online. We are introducing cryptocurrency
      as an “intermediate asset solution” to pay for work provided.
      We are providing additional revenue sources for 80% of the world's
      population that work hard in 2-3 jobs. Our platform provides a 
      return on knowledge (RoK). We are breaking down the language 
      barrier providing localised information sharing so anyone can
      ask in any language.
      </>
    ),
  },
  {
    title: 'What is our solution to the problem?',
    content: () => (
      <>
      A simple to use, yet highly versatile fuzzy logic information
      platform that provides validated answers via a Q&A platform 
      and Solutions Library. Our process kicks off by ensuring the
      registered users that wish to provide answers and solutions
      are experienced in a specific range of fields. We offer
      them payment via an intermediary cryptocurrency which 
      can then be exchanged for Fiat via our internal dApp
      or traded on exchanges.
      </>
    ),
  },
  {
    title: 'What is a typical use case of Fuzzy.One?',
    content: () => (
    <> 
    A driver has an issue with his vehicle, he needs it fixed urgently,
    he posts a question in the system and sets the time limit to 10 minutes.
    Possibly up to 5 users know a solution, their app pings when an urgent
    question that has their tags on it comes up, they respond within the
    10-minute time frame and they are credited with the crypto for their response.
    </>
    ),
  },
  {
    title: 'Why hasn’t your solution been built before?',
    content: () => (
      <>
      The internet is not so new, but crypto is definitely still in its infancy.
      The combination of intermediate liquidity (cryptocurrency) as an asset 
      for payment has been touched but not in such a direct manner. The cyclic
      marketing model we provide has not been used before. This model forces 
      the market to maintain a bullish crypto value as we constantly buy the
      crypto back using a portion of the income from advertising. Essentially
      a self-sustaining eco-system.
      </>
    ),
  },
  {
    title: 'Why do you think now is the right time?',
    content: () => (
      <>
      The time is always right now, especially with emerging markets. The time
      is right for us to provide extra sources of income for 80% of the worlds
      population that is considered poor! We offer them the ability to earn
      income through answering questions they have already solved. The covid
      era opened up the internet in ways it was not fully understood, working
      from home replaced travel, rideshare got hit, but the human brain,
      experience, knowledge is always there. Information is the domain
      of the human brain, and everyone has a brain.

      </>
    ),
  },
];

const Faq = () => (
  <Section id="faq" accent="secondary">
    <Container>
      <h1 style={{ marginBottom: 40 }}>Frequently Asked Questions</h1>
      <div>
        {FAQS.map(({ title, content }) => (
          <FaqItem title={title} key={title}>
            {content()}
          </FaqItem>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
