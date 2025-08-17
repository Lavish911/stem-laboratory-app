import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import type { Product } from '@shared/schema';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Truck, AlertTriangle, Star } from 'lucide-react';
import { useState } from 'react';

export default function ProductPage() {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-gray">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-gray">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Button 
              onClick={() => window.location.href = '/catalog'}
              className="bg-science-blue hover:bg-science-blue/90"
            >
              Browse All Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Chemistry Sets': 'bg-science-blue/10 text-science-blue',
      'Robotics Kits': 'bg-lab-green/10 text-lab-green',
      'Arduino Projects': 'bg-purple-100 text-purple-700',
      'Lab Equipment': 'bg-orange-100 text-orange-700',
      'Physics Kits': 'bg-lab-green/10 text-lab-green',
      'default': 'bg-gray-100 text-gray-700'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      price: product.price,
      name: product.name,
      imageUrl: product.imageUrl
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const specifications = product.specifications as any || {};

  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <span>Home</span> / <span>Products</span> / <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-6">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg p-6">
            <Badge className={`${getCategoryColor(product.category)} mb-4`}>
              {product.category}
            </Badge>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">(4.8/5 from 124 reviews)</span>
            </div>
            
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900 mr-4">
                ₹{parseFloat(product.price).toLocaleString('en-IN')}
              </span>
              {product.inStock <= 5 && product.inStock > 0 && (
                <Badge variant="outline" className="text-alert-red border-alert-red">
                  Only {product.inStock} left!
                </Badge>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Age Group: {product.ageGroup}</p>
              <p className="text-sm text-gray-600">
                Stock Status: 
                <span className={product.inStock > 0 ? 'text-lab-green ml-1' : 'text-alert-red ml-1'}>
                  {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.inStock}
                >
                  +
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                className="flex-1 bg-science-blue hover:bg-science-blue/90 text-white text-lg py-6"
              >
                {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 text-lab-green mb-1" />
                <span className="text-xs text-gray-600">Safety Certified</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6 text-lab-green mb-1" />
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-6 w-6 text-lab-green mb-1" />
                <span className="text-xs text-gray-600">Top Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="text-gray-900 text-right">{String(value)}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Group:</span>
                  <span className="text-gray-900">{product.ageGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Information */}
          {product.safetyInfo && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-alert-red mr-2" />
                  Safety Information
                </h3>
                <p className="text-gray-700">{product.safetyInfo}</p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Always read and follow all safety instructions before beginning any experiment.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
