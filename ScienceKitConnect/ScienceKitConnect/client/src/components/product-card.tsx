import type { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

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
      quantity: 1,
      price: product.price,
      name: product.name,
      imageUrl: product.imageUrl
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className={`group bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 ${className}`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          
          {/* Stock status with gradient styling */}
          {product.inStock <= 5 && product.inStock > 0 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-warm-orange to-alert-red text-white font-medium px-3 py-1 rounded-full border-0 shadow-lg">
                Only {product.inStock} left
              </Badge>
            </div>
          )}
          
          {product.inStock === 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Badge className="bg-deep-navy text-white text-lg px-6 py-3 rounded-full font-bold shadow-xl">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Badge className={`${getCategoryColor(product.category)} mb-3 rounded-full px-3 py-1 font-medium`}>
          {product.category}
        </Badge>
        
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-science-blue transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-deep-navy to-science-blue bg-clip-text text-transparent">
            ₹{parseFloat(product.price).toLocaleString('en-IN')}
          </span>
          <Button 
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-science-blue to-accent-purple hover:from-science-blue/90 hover:to-accent-purple/90 text-white rounded-xl px-6 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            disabled={product.inStock === 0}
          >
            {product.inStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
        
        {product.inStock <= 5 && product.inStock > 0 && (
          <p className="text-sm text-alert-red mt-2">
            Only {product.inStock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}
