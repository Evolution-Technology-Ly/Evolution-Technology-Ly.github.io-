
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Code, Briefcase } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '150+' },
    { icon: Code, label: 'Projects Completed', value: '300+' },
    { icon: Briefcase, label: 'Years Experience', value: '8+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Evolution Technology</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a forward-thinking software development company dedicated to creating 
            innovative solutions that drive business growth and digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              At Evolution Technology, we believe in the power of technology to transform businesses 
              and improve lives. Our mission is to deliver cutting-edge software solutions that not 
              only meet our clients' current needs but also position them for future success.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We combine technical expertise with creative thinking to solve complex challenges 
              and create software that makes a real difference in the world.
            </p>
          </div>
          
          <div className="animate-slide-in-right">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop" 
              alt="Team collaboration" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
