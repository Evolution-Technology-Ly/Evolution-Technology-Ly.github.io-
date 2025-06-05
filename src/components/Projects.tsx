
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with advanced inventory management and payment processing.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      category: 'Web Application'
    },
    {
      title: 'Healthcare Management System',
      description: 'Digital platform streamlining patient records, appointments, and medical data management.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'AWS'],
      category: 'Enterprise Software'
    },
    {
      title: 'Financial Analytics Dashboard',
      description: 'Real-time financial data visualization and analytics platform for investment firms.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop',
      technologies: ['React', 'D3.js', 'Python', 'Redis'],
      category: 'Data Analytics'
    },
    {
      title: 'Mobile Learning App',
      description: 'Interactive educational platform with gamification and progress tracking features.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      category: 'Mobile Application'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore some of our recent work and see how we've helped businesses 
            achieve their digital transformation goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden card-hover animate-fade-in bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
