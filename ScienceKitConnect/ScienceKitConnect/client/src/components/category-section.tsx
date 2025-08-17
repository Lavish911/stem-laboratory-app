import { useQuery } from '@tanstack/react-query';
import type { Category } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategorySection() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-light-mint to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-deep-navy to-science-blue bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our comprehensive collection of STEM learning tools designed to inspire curiosity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer card-hover">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                  <Skeleton className="w-full h-56" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="bg-gradient-to-br from-light-mint to-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-deep-navy to-science-blue bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">No categories available at the moment.</p>
        </div>
      </section>
    );
  }

  const handleCategoryClick = (categoryName: string) => {
    const searchParam = categoryName.toLowerCase().replace(/\s+/g, '');
    window.location.href = `/catalog?category=${searchParam}`;
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-science-blue/20 to-science-blue/30',
      'from-lab-green/20 to-lab-green/30',
      'from-purple-500/20 to-purple-500/30',
      'from-orange-500/20 to-orange-500/30'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="bg-gradient-to-br from-light-mint to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-deep-navy to-science-blue bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of STEM learning tools designed to inspire curiosity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="group cursor-pointer card-hover"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(index)} group-hover:opacity-60 transition-all`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <div className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-sm font-medium inline-block">
                    {category.productCount}+ Products
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
