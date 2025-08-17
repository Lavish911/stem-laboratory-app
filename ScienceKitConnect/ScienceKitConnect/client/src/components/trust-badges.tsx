import { Shield, Truck, GraduationCap, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Safety Certified',
      description: 'All kits meet educational safety standards'
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over ₹6,249'
    },
    {
      icon: GraduationCap,
      title: 'Educator Approved',
      description: 'Designed by STEM professionals'
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: '24/7 educational assistance'
    }
  ];

  return (
    <section className="bg-white py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <IconComponent className="h-8 w-8 text-lab-green mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
