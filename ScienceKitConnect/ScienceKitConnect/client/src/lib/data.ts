// This file contains mock data and utility functions for the STEM education store
// In a real application, this would be replaced with API calls

export const sampleProducts = [
  {
    id: '1',
    name: 'Advanced Chemistry Explorer Kit',
    description: '50+ experiments covering acids, bases, crystallization, and chemical reactions. Includes safety equipment and detailed manual.',
    price: '10799.00',
    category: 'Chemistry Sets',
    subcategory: 'Advanced',
    ageGroup: 'High School (15-18)',
    imageUrl: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    inStock: 25,
    featured: true,
    specifications: {
      experiments: 50,
      safetyEquipment: true,
      manual: '200-page illustrated guide',
      chemicals: '15 safe chemicals included'
    },
    safetyInfo: 'Adult supervision required. Safety goggles and gloves included.'
  }
];

export const categories = [
  {
    id: '1',
    name: 'Chemistry Sets',
    description: 'Complete chemistry experiment kits with safety equipment',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 18
  },
  {
    id: '2',
    name: 'Robotics Kits',
    description: 'Build and program robots with advanced sensors',
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 15
  },
  {
    id: '3',
    name: 'Arduino Projects',
    description: 'Electronics and programming experiments',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 25
  },
  {
    id: '4',
    name: 'Lab Manuals',
    description: 'Educational guides and digital resources',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    productCount: 27
  }
];

export function formatPrice(price: string): string {
  return `₹${parseFloat(price).toLocaleString('en-IN')}`;
}

export function getCategorySlug(categoryName: string): string {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
}

export function getAgeGroupColor(ageGroup: string): string {
  const colors = {
    'Elementary (6-11)': 'bg-green-100 text-green-800',
    'Middle School (12-14)': 'bg-blue-100 text-blue-800',
    'High School (15-18)': 'bg-purple-100 text-purple-800',
    'College+': 'bg-gray-100 text-gray-800'
  };
  return colors[ageGroup as keyof typeof colors] || colors['College+'];
}
