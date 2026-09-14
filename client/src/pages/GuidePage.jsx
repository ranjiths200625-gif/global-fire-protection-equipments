import React from 'react';
import OperationGuide from '../components/home/OperationGuide';
import ContactSection from '../components/home/ContactSection';

const GuidePage = () => {
  return (
    <div className="pt-8">
      <OperationGuide />
      <ContactSection />
    </div>
  );
};

export default GuidePage;
