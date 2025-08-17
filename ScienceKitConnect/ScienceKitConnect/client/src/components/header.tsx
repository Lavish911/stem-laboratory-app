import { useState } from 'react';
import { Link } from 'wouter';
import { Search, ShoppingCart, Menu, X, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import ShoppingCartComponent from './shopping-cart';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <div className="bg-gradient-to-br from-science-blue to-accent-purple p-2 rounded-xl">
              <FlaskConical className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-deep-navy to-science-blue bg-clip-text text-transparent">
                ScienceKit Pro
              </h1>
              <p className="text-xs text-gray-500">STEM Learning Hub</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/catalog?category=chemistry" className="px-4 py-2 rounded-lg text-deep-navy hover:bg-science-blue/10 hover:text-science-blue transition-all font-medium">
              Chemistry
            </Link>
            <Link href="/catalog?category=robotics" className="px-4 py-2 rounded-lg text-deep-navy hover:bg-lab-green/10 hover:text-lab-green transition-all font-medium">
              Robotics
            </Link>
            <Link href="/catalog?category=arduino" className="px-4 py-2 rounded-lg text-deep-navy hover:bg-accent-purple/10 hover:text-accent-purple transition-all font-medium">
              Arduino
            </Link>
            <Link href="/catalog?category=manuals" className="px-4 py-2 rounded-lg text-deep-navy hover:bg-warm-orange/10 hover:text-warm-orange transition-all font-medium">
              Resources
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search experiments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-72 bg-white/80 backdrop-blur border-0 rounded-xl shadow-lg focus:shadow-xl focus:ring-2 focus:ring-science-blue/50 transition-all"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-science-blue" />
            </form>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-3 rounded-xl hover:bg-science-blue/10 transition-all">
                  <ShoppingCart className="h-6 w-6 text-deep-navy" />
                  {cart.itemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-science-blue to-accent-purple text-white border-2 border-white shadow-lg"
                    >
                      {cart.itemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <ShoppingCartComponent />
              </SheetContent>
            </Sheet>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <FlaskConical className="h-5 w-5 text-science-blue" />
                    <span>ScienceKit Pro</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/catalog?category=chemistry" className="text-gray-700 hover:text-science-blue transition-colors">
                    Chemistry Sets
                  </Link>
                  <Link href="/catalog?category=robotics" className="text-gray-700 hover:text-science-blue transition-colors">
                    Robotics Kits
                  </Link>
                  <Link href="/catalog?category=arduino" className="text-gray-700 hover:text-science-blue transition-colors">
                    Arduino Projects
                  </Link>
                  <Link href="/catalog?category=manuals" className="text-gray-700 hover:text-science-blue transition-colors">
                    Lab Manuals
                  </Link>
                  <Link href="/catalog" className="text-gray-700 hover:text-science-blue transition-colors">
                    Resources
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search experiments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-science-blue focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
