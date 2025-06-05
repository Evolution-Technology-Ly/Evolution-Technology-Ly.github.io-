
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Lead Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Full-stack developer with 10+ years of experience in building scalable applications.'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Software Architect',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in system architecture and cloud solutions with a passion for innovative technologies.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Frontend Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'UI/UX specialist creating beautiful and intuitive user interfaces that users love.'
    },
    {
      name: 'Emily Davis',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Database expert and API developer ensuring robust and secure backend systems.'
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our talented team of developers, designers, and strategists work together 
            to deliver exceptional results for every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center card-hover animate-fade-in bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
