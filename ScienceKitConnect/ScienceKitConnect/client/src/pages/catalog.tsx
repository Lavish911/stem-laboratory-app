import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useRoute } from 'wouter';
import type { Product } from '@shared/schema';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import ProductFilters, { FilterState } from '@/components/product-filters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export default function Catalog() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: '',
    ageGroups: []
  });
  const [sortBy, setSortBy] = useState('featured');

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const searchQuery = urlParams.get('q') || '';
  const categoryParam = urlParams.get('category') || '';

  // Build query params for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (categoryParam) params.set('category', categoryParam);
    
    // Add filter params
    if (filters.priceRange) {
      if (filters.priceRange === 'under-4000') params.set('maxPrice', '4000');
      if (filters.priceRange === '4000-12000') {
        params.set('minPrice', '4000');
        params.set('maxPrice', '12000');
      }
      if (filters.priceRange === 'over-12000') params.set('minPrice', '12000');
    }
    
    filters.categories.forEach(cat => {
      params.append('category', cat);
    });
    
    filters.ageGroups.forEach(age => {
      params.append('ageGroup', age);
    });
    
    return params.toString();
  };

  const queryParams = buildQueryParams();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/search', queryParams],
    queryFn: async () => {
      const url = queryParams ? `/api/products/search?${queryParams}` : '/api/products';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  // Sort products
  const sortedProducts = products ? [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high-low':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.featured - a.featured;
    }
  }) : [];

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (categoryParam) {
      const categoryMap: { [key: string]: string } = {
        chemistry: 'Chemistry Sets',
        robotics: 'Robotics Kits',
        arduino: 'Arduino Projects',
        manuals: 'Lab Manuals & Resources'
      };
      return categoryMap[categoryParam] || 'Products';
    }
    return 'All Products';
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters 
              onFiltersChange={setFilters}
              className="w-full"
            />
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {getPageTitle()}
                </h1>
                {!isLoading && (
                  <p className="text-gray-600">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                )}
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Sort by: Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-20 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462-.74-6.21-2M6 20.291A7.962 7.962 0 0112 18a7.962 7.962 0 016.21 2.291" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={() => window.location.href = '/catalog'}
                  className="bg-science-blue hover:bg-science-blue/90"
                >
                  View All Products
                </Button>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && sortedProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination - Simple version */}
            {!isLoading && sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    ← Previous
                  </Button>
                  <Button className="bg-science-blue text-white">
                    1
                  </Button>
                  <Button variant="outline" disabled>
                    Next →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
