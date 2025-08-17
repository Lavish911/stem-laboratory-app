import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import TrustBadges from '@/components/trust-badges';
import FeaturedProducts from '@/components/featured-products';
import CategorySection from '@/components/category-section';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Play, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      <HeroSection />
      <TrustBadges />
      <div id="product-catalog">
        <FeaturedProducts />
      </div>
      <CategorySection />
      
      {/* Educational Resources Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides, video tutorials, and lab manuals to enhance your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-science-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-science-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lab Manuals</h3>
              <p className="text-gray-600 mb-4">
                Step-by-step experiment guides with safety protocols and learning objectives for every kit.
              </p>
              <Button 
                variant="link" 
                className="text-science-blue hover:text-science-blue/80"
                onClick={() => window.location.href = '/catalog?category=manuals'}
              >
                Browse Manuals →
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-lab-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-lab-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Expert-led video instructions demonstrating proper techniques and safety procedures.
              </p>
              <Button 
                variant="link" 
                className="text-science-blue hover:text-science-blue/80"
              >
                Watch Videos →
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with educators and students, share projects, and get help from our expert community.
              </p>
              <Button 
                variant="link" 
                className="text-science-blue hover:text-science-blue/80"
              >
                Join Community →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-science-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest STEM Innovations</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new product launches, educational content, and special discounts for educators.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white border-0 focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-science-blue hover:bg-gray-100 font-semibold px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
