import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ContactSection from '../components/home/ContactSection';

const AboutPage = () => {
  const { onOpenEnquiry } = useOutletContext();

  return (
    <div className="pt-8">
      <AboutSection onOpenEnquiry={onOpenEnquiry} />
      <WhyChooseUs />
      <ContactSection />
    </div>
  );
};

export default AboutPage;
