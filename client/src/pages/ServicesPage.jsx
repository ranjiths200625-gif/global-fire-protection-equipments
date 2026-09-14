import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ServicesSection from '../components/home/ServicesSection';
import ContactSection from '../components/home/ContactSection';

const ServicesPage = () => {
  const { onOpenEnquiry } = useOutletContext();

  return (
    <div className="pt-8">
      <ServicesSection onOpenEnquiry={onOpenEnquiry} />
      <ContactSection />
    </div>
  );
};

export default ServicesPage;
