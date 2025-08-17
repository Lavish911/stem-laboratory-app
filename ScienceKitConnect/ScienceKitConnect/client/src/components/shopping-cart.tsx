import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Link } from 'wouter';

export default function ShoppingCartComponent() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 text-center mb-4">
          Start exploring our STEM kits and add items to your cart
        </p>
        <Link href="/catalog">
          <Button className="bg-science-blue hover:bg-science-blue/90">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 line-clamp-2">
                {item.name}
              </h4>
              <p className="text-gray-600">₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
              
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0 rounded-full"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Badge variant="outline" className="px-2">
                  {item.quantity}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0 rounded-full"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <p className="font-medium text-gray-900">
                ₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="text-alert-red hover:text-alert-red/80 hover:bg-alert-red/10"
                onClick={() => removeFromCart(item.productId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-science-blue">
            ₹{parseFloat(cart.total).toLocaleString('en-IN')}
          </span>
        </div>
        
        <div className="space-y-3">
          <Link href="/checkout">
            <Button className="w-full bg-science-blue hover:bg-science-blue/90 text-white">
              Proceed to Checkout
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          {cart.items.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full text-gray-500 hover:text-alert-red"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
