import React, { useState } from 'react';
import { useSkinCare } from '../../context/SkinCareContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Filter, 
  Search, 
  Check, 
  Info, 
  BookOpen, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ProductsScreen = () => {
  const { products, ingredients, profile } = useSkinCare();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const categories = ['All', 'Cleanser', 'Toner & Mist', 'Serum', 'Moisturizer', 'Sunscreen'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keyIngredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.whyItFits.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-screen animate-fade-in">
      {/* Header */}
      <div className="products-header">
        <div>
          <div className="badge badge-lavender">
            <ShoppingBag size={14} />
            <span>Curated Formulations</span>
          </div>
          <h1 className="products-title">Skincare Formulations & Ingredient Directory</h1>
          <p className="products-subtitle">
            Evidence-informed product architectures, key active ingredients, and texture profiles suited for barrier support.
          </p>
        </div>
      </div>

      {/* Ingredient Glossary Bar */}
      <div className="ingredient-glossary-section card">
        <div className="glossary-header-row">
          <div className="glossary-title-col">
            <BookOpen size={18} className="text-lavender" />
            <h3 className="glossary-title">Key Active Ingredient Spotlight</h3>
          </div>
          <span className="badge badge-sage">Dermatology Science Primer</span>
        </div>

        <div className="glossary-chips-row">
          {ingredients.map((ing, idx) => {
            const isSelected = selectedIngredient?.name === ing.name;
            return (
              <button
                key={idx}
                type="button"
                className={`ingredient-chip ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedIngredient(isSelected ? null : ing)}
              >
                <span>{ing.name}</span>
              </button>
            );
          })}
        </div>

        {selectedIngredient && (
          <div className="ingredient-detail-card animate-fade-in">
            <div className="ing-detail-top">
              <strong>{selectedIngredient.name}</strong>
              <span className="badge badge-lavender">{selectedIngredient.role}</span>
              <span className="badge badge-amber">{selectedIngredient.timeOfDay}</span>
            </div>
            <p className="ing-detail-desc">{selectedIngredient.description}</p>
            <div className="ing-detail-suitability">
              <span className="suitability-label">Optimal For:</span>
              <div className="suitability-tags">
                {selectedIngredient.goodFor.map((tag, tIdx) => (
                  <span key={tIdx} className="badge badge-blush">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters & Search Row */}
      <div className="products-filter-bar">
        <div className="categories-pill-list">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-field"
            placeholder="Search by active ingredient (e.g. Ceramides, Niacinamide)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => {
          const isProfileMatch = 
            product.skinTypes.includes('all') || 
            product.skinTypes.includes(profile.skinType);

          return (
            <div key={product.id} className="product-card card card-interactive">
              <div className="product-card-top">
                <span className="badge badge-lavender">{product.category}</span>
                {isProfileMatch && (
                  <span className="badge badge-sage">
                    <Check size={12} /> Matches Your {profile.skinType} Skin
                  </span>
                )}
              </div>

              <div className="product-info-block">
                <span className="product-brand">{product.brand}</span>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-texture">
                  <strong>Texture:</strong> {product.texture}
                </p>
              </div>

              {/* Ingredients list */}
              <div className="product-ingredients-box">
                <span className="ing-label">Key Actives:</span>
                <div className="ing-pills-row">
                  {product.keyIngredients.map((ing, iIdx) => (
                    <span key={iIdx} className="product-ing-pill">{ing}</span>
                  ))}
                </div>
              </div>

              <div className="product-why-box">
                <strong>Why this works:</strong>
                <p>{product.whyItFits}</p>
              </div>

              <div className="product-meta-footer">
                <span className="ph-badge">pH: {product.ph}</span>
                <span className="tip-badge">{product.tips}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-products card text-center">
          <p>No formulations found matching "{searchQuery}". Try selecting "All" categories or clearing your search.</p>
        </div>
      )}
    </div>
  );
};
