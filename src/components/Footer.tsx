
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/62e19d04-23f6-4cab-b165-3a17fbdf62e9.png" 
                alt="Evolution Technology Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">Evolution Technology</span>
            </div>
            <p className="text-gray-400 mb-4">
              Evolving the future through innovative software solutions and cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Custom Software Development</li>
              <li>Web & Mobile Development</li>
              <li>Technical Consulting</li>
              <li>System Integration</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>hello@evolutiontech.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Innovation Drive</li>
              <li>Tech City, TC 12345</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Evolution Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
