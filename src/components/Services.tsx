
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Laptop, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built from the ground up to meet your specific business requirements and goals.',
      features: ['Web Applications', 'Desktop Software', 'API Development', 'System Integration']
    },
    {
      icon: Laptop,
      title: 'Web & Mobile Development',
      description: 'Modern, responsive web applications and mobile apps that provide exceptional user experiences across all devices.',
      features: ['React & Vue.js', 'React Native', 'Progressive Web Apps', 'E-commerce Solutions']
    },
    {
      icon: Users,
      title: 'Technical Consulting',
      description: 'Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.',
      features: ['Technology Audit', 'Architecture Design', 'Code Review', 'Performance Optimization']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a comprehensive range of software development services to help 
            your business thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover animate-fade-in bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardHeader className="text-center">
                <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
