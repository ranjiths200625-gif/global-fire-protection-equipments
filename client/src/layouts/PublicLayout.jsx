import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingMobileBar from '../components/common/FloatingMobileBar';
import EnquiryModal from '../components/common/EnquiryModal';

const PublicLayout = () => {
  const [enquiryModal, setEnquiryModal] = useState({ isOpen: false, item: 'General Enquiry' });

  const handleOpenEnquiry = (item = 'General Enquiry') => {
    setEnquiryModal({ isOpen: true, item });
  };

  const handleCloseEnquiry = () => {
    setEnquiryModal({ isOpen: false, item: 'General Enquiry' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-700 selection:text-white">
      <Navbar onOpenEnquiry={handleOpenEnquiry} />
      <main className="flex-1 pb-16 sm:pb-0">
        <Outlet context={{ onOpenEnquiry: handleOpenEnquiry }} />
      </main>
      <Footer />
      <FloatingMobileBar onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')} />
      <EnquiryModal
        isOpen={enquiryModal.isOpen}
        onClose={handleCloseEnquiry}
        initialItem={enquiryModal.item}
      />
    </div>
  );
};

export default PublicLayout;
