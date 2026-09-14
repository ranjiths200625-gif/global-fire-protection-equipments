import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductsSection from '../components/home/ProductsSection';
import ServicesSection from '../components/home/ServicesSection';
import OperationGuide from '../components/home/OperationGuide';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';

const HomePage = () => {
  const { onOpenEnquiry } = useOutletContext();

  return (
    <>
      <Hero onOpenEnquiry={onOpenEnquiry} />
      <ProductsSection onOpenEnquiry={onOpenEnquiry} />
      <ServicesSection onOpenEnquiry={onOpenEnquiry} />
      <OperationGuide />
      <AboutSection onOpenEnquiry={onOpenEnquiry} />
      <WhyChooseUs />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default HomePage;
