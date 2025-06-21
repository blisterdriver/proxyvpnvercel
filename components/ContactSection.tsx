import { MapPin, Phone, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-cure-gray-400/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-6">
            <span className="text-white">Get in</span>{' '}
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-cure-gray-100 max-w-3xl mx-auto">
            Have questions about CureProxy? Our team is here to help you dominate your games. {/* No apostrophe found here. If there was, e.g., "team's", it would be "team's" */}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form (Client Component) */}
          <ContactForm />

          {/* Contact Info (Server Component) */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-orbitron font-semibold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-cure-gray-100 mb-8">
                Ready to take your gaming to the next level? Reach out to us and let's get you started with CureProxy. {/* FIXED: "let's" -> "let's" */}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cure-green/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-cure-green" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Address</h4>
                  <p className="text-cure-gray-100">
                    123 Gaming Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cure-blue/20 rounded-lg">
                  <Phone className="h-6 w-6 text-cure-blue" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-cure-gray-100">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cure-purple/20 rounded-lg">
                  <Clock className="h-6 w-6 text-cure-purple" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Support Hours</h4>
                  <p className="text-cure-gray-100">
                    24/7 Live Chat Support<br />
                    Monday - Friday: 9AM - 6PM EST<br />
                    Weekend: 10AM - 4PM EST
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cure-gray-400/20 rounded-xl p-6 border border-cure-gray-300/20">
              <h4 className="text-white font-semibold mb-2">Quick Response Guarantee</h4>
              <p className="text-cure-gray-100 text-sm">
                We respond to all inquiries within 2 hours during business hours. For urgent gaming issues, use our live chat for instant support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;