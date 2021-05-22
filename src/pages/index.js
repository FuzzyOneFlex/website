import React from 'react';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import Header from '@sections/Header';
import About from '@sections/About';
import Affiliations from '@sections/Affiliations';
import Team from '@sections/Team';
import Widget from '@sections/Widget';
import Roadmap from '@sections/Roadmap';
import Faq from '@sections/Faq';
import Footer from '@sections/Footer';

const IndexPage = () => (
  <Layout>
    <Navbar />
    <Header />
    <About />
    <Roadmap />
    <Team />
    <Widget />
    <Affiliations />
    <Faq />
    <Footer />
  </Layout>
);

export default IndexPage;
