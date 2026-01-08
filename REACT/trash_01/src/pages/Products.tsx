import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  
  const categoryFilter = searchParams.get('category') || 'all';
  const genderFilter = searchParams.get('gender') || 'all';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Filter by gender
    if (genderFilter !== 'all') {
      result = result.filter(p => p.gender === genderFilter || p.gender === 'unisex');
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
    }

    return result;
  }, [categoryFilter, genderFilter, sortBy]);

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleGenderChange = (gender: string) => {
    if (gender === 'all') {
      searchParams.delete('gender');
    } else {
      searchParams.set('gender', gender);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Tất Cả Sản Phẩm</h1>
        <p>Khám phá bộ sưu tập kính mắt đa dạng của chúng tôi</p>
      </div>

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
          <div className="filter-header">
            <h3>Bộ Lọc</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              ×
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Danh Mục</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={categoryFilter === 'all'}
                  onChange={() => handleCategoryChange('all')}
                />
                <span>Tất cả</span>
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === cat.id}
                    onChange={() => handleCategoryChange(cat.id)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="filter-group">
            <h4>Giới Tính</h4>
            <div className="filter-options">
              {['all', 'men', 'women', 'unisex'].map(gender => (
                <label key={gender} className="filter-option">
                  <input
                    type="radio"
                    name="gender"
                    checked={genderFilter === gender}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <span>
                    {gender === 'all' ? 'Tất cả' : 
                     gender === 'men' ? 'Nam' : 
                     gender === 'women' ? 'Nữ' : 'Unisex'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Content */}
        <div className="products-content">
          {/* Toolbar */}
          <div className="products-toolbar">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(true)}
            >
              <Filter size={18} />
              Bộ Lọc
            </button>

            <span className="products-count">
              {filteredProducts.length} sản phẩm
            </span>

            <div className="toolbar-right">
              <div className="sort-dropdown">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Mặc định</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao</option>
                </select>
                <ChevronDown size={16} />
              </div>

              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>Không tìm thấy sản phẩm nào phù hợp</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
