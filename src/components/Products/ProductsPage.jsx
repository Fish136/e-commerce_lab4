import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import Filters from '../Filter';
import { mockProducts } from '../../data/mockProducts';
import '../../styles/ProductsPage.css';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 0,
    maxPrice: 1000
  });


  const banners = [
    { id: 1, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_nekomataokayu_sukajan_EN_0718_1.png?v=1753163330', title: 'Banner 1' },
    { id: 2, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_MinaseRio_BC_banner_EN_250724_1.png?v=1753337608', title: 'Banner 2' },
    { id: 3, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_holonatsuparadise_02_bunner_EN_250723_1.png?v=1753323328', title: 'Banner 3' },
    { id: 4, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_Koganei_Niko_BC_banner_EN_250724_ol_1.png?v=1753611084', title: 'Banner 4' },
    { id: 5, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/250728_SummerVacVoice22RE_EN_yokonaga.png?v=1753166004', title: 'Banner 5' },
    { id: 6, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_Artselection_banner_Azki_EN_1.png?v=1752818630', title: 'Banner 6' },
    { id: 7, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_Artselection_banner_Iroha_EN_1.png?v=1752820976', title: 'Banner 7' },
    { id: 8, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/20250729_en_Robocosan_Voice_Pack_Hello_World_Now_Initializing_Roboco_Monday_Smiles__01.png?v=1753358248', title: 'Banner 8' },
    { id: 9, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/HM_liveBD_Banner_EN_YT_Tw_Bn.png?v=1753766228', title: 'Banner 9' },
    { id: 10, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_HoushouMarine_BC_banner_EN_25728_ol_1.png?v=1753669076', title: 'Banner 10' },
    { id: 11, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_fuwamoco_2nd_banner_EN_250723_1.png?v=1753749289', title: 'Banner 11' },
    { id: 12, image: 'https://cdn.shopify.com/s/files/1/0529/2641/5045/files/holo_sakuramiko_7th_banner_EN_1.png?v=1753834991', title: 'Banner 12' },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="products-page">
      <div className="banner-section">
        <div className="main-banner">
          <button className="banner-nav banner-nav-left" onClick={prevBanner}>
            <ChevronLeft size={24} />
          </button>
          <div className="banner-container">
            <img
              src={banners[currentBannerIndex].image}
              alt={banners[currentBannerIndex].title}
              className="banner-image"
            />
          </div>
          <button className="banner-nav banner-nav-right" onClick={nextBanner}>
            <ChevronRight size={24} />
          </button>
        </div>

  
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => setCurrentBannerIndex(index)}
            />
          ))}
        </div>

       
        <div className="banner-thumbnails">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="thumbnail-item"
              onClick={() => setCurrentBannerIndex(index)}
            >
              <img
                src={banner.image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          ))}

        </div>
      </div>

     
      <div className="search-filter-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Merch Section */}
      <div className="new-merch-section">
        <div className="section-header">
          <div className="section-title">
            <span className="snowflake-icon">❄️</span>
            <h2>NEW MERCH</h2>
          </div>
          <button className="view-all-btn">
            All Products
            <span className="arrow">→</span>
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.slice(0, 8).map(product => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length > 8 && (
          <div className="products-grid products-grid-extended">
            {filteredProducts.slice(8).map(product => (
              <div key={product.id} className="product-item">
                <div className="product-badges">
                  <span className="new-badge">NEW</span>
                  {product.isDigital && <span className="digital-badge">DIGITAL</span>}
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p className="no-products-title">No products found matching your criteria.</p>
          <p className="no-products-subtitle">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;