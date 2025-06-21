'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
  };

  return (
    <div className="bg-cure-gray-400/20 rounded-xl p-8 border border-cure-gray-300/20">
      <h3 className="text-2xl font-orbitron font-semibold text-white mb-6">
        Send us a message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-cure-gray-100 text-sm font-medium mb-2">
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              required
              className="bg-cure-gray-400/30 border-cure-gray-300 text-white placeholder:text-cure-gray-200 focus:border-cure-green"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-cure-gray-100 text-sm font-medium mb-2">
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              required
              className="bg-cure-gray-400/30 border-cure-gray-300 text-white placeholder:text-cure-gray-200 focus:border-cure-green"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-cure-gray-100 text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            className="bg-cure-gray-400/30 border-cure-gray-300 text-white placeholder:text-cure-gray-200 focus:border-cure-green"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-cure-gray-100 text-sm font-medium mb-2">
            Subject
          </label>
          <Input
            id="subject"
            type="text"
            required
            className="bg-cure-gray-400/30 border-cure-gray-300 text-white placeholder:text-cure-gray-200 focus:border-cure-green"
            placeholder="How can we help you?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-cure-gray-100 text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            required
            rows={4}
            className="bg-cure-gray-400/30 border-cure-gray-300 text-white placeholder:text-cure-gray-200 focus:border-cure-green resize-none"
            placeholder="Tell us about your gaming needs or any questions you have..."
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-white font-medium h-12"
        >
          <Send className="mr-2 h-5 w-5" />
          Send Message
        </Button>
      </form>
    </div>
  );
};