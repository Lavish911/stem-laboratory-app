import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('product-catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-science-blue via-accent-purple to-deep-navy text-white py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warm-orange/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-lab-green/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
            Discover the<br />
            <span className="text-warm-orange">Joy of Science</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Premium STEM education kits for students, educators, and curious minds. 
            From chemistry sets to robotics - everything you need to explore and learn.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-deep-navy mb-8 font-semibold">
            <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
            <span>Proudly created by Lavish Rahangdale & Om Ninave</span>
            <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={scrollToCatalog}
              size="lg"
              className="bg-white text-deep-navy px-10 py-4 text-lg hover:bg-blue-50 transition-all transform hover:scale-105 font-bold shadow-2xl rounded-2xl"
            >
              Browse Catalog
              <div className="ml-2 w-2 h-2 bg-science-blue rounded-full animate-bounce"></div>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white bg-white text-deep-navy px-10 py-4 text-lg hover:bg-gray-100 hover:text-black transition-all transform hover:scale-105 font-bold rounded-2xl shadow-lg"
              onClick={() => window.location.href = '/catalog?category=manuals'}
            >
              Educational Resources
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
