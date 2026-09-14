import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductsSection from '../components/home/ProductsSection';
import ContactSection from '../components/home/ContactSection';

const ProductsPage = () => {
  const { onOpenEnquiry } = useOutletContext();

  return (
    <div className="pt-8">
      <ProductsSection onOpenEnquiry={onOpenEnquiry} />
      <ContactSection />
    </div>
  );
};

export default ProductsPage;
