import { FlaskConical, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-deep-navy to-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-science-blue to-accent-purple p-2 rounded-xl">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ScienceKit Pro
                </h3>
                <p className="text-xs text-blue-200">STEM Learning Hub</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Empowering the next generation of scientists, engineers, and innovators 
              through hands-on learning experiences.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
                <p className="font-bold text-deep-navy text-sm bg-white/90 px-3 py-1 rounded-full">
                  Created by Lavish Rahangdale & Om Ninave
                </p>
              </div>
              <p className="text-xs text-blue-300">Inspiring young minds through STEM education</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg text-blue-200 hover:text-white hover:bg-science-blue/20 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-blue-200 hover:text-white hover:bg-science-blue/20 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-blue-200 hover:text-white hover:bg-science-blue/20 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-blue-200 hover:text-white hover:bg-science-blue/20 transition-all">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Products</h4>
            <ul className="space-y-3 text-blue-200">
              <li>
                <Link href="/catalog?category=chemistry" className="hover:text-white transition-colors hover:translate-x-1 transform inline-block">
                  Chemistry Sets
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=robotics" className="hover:text-white transition-colors">
                  Robotics Kits
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=arduino" className="hover:text-white transition-colors">
                  Arduino Projects
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=lab" className="hover:text-white transition-colors">
                  Lab Equipment
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=manuals" className="hover:text-white transition-colors">
                  Digital Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Educator Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ScienceKit Pro. All rights reserved. | Empowering STEM education worldwide.</p>
          <p className="mt-2 text-sm">Created by <span className="text-science-blue font-medium">Lavish Rahangdale</span> and <span className="text-science-blue font-medium">Om Ninave</span></p>
        </div>
      </div>
    </footer>
  );
}
