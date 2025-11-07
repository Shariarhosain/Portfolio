/*
 * EMAILJS SETUP INSTRUCTIONS:
 * 1. Go to https://www.emailjs.com/
 * 2. Create a free account
 * 3. Create a new email service (Gmail/Outlook/etc.)
 * 4. Create an email template with these variables: {{from_name}}, {{from_email}}, {{message}}
 * 5. Get your Service ID, Template ID, and Public Key
 * 6. Replace the placeholder values in handleSubmit function below
 * 7. Test the contact form
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if EmailJS is configured
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // If EmailJS is not configured, use mailto fallback
    if (!serviceID || !templateID || !publicKey || 
        serviceID === 'YOUR_SERVICE_ID' || 
        templateID === 'YOUR_TEMPLATE_ID' || 
        publicKey === 'YOUR_PUBLIC_KEY') {
      
      // Create mailto link as fallback
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:shariarhosain131529@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Template parameters that will be sent to your email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'shariarhosain131529@gmail.com',
      };

      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Fallback to mailto if EmailJS fails
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:shariarhosain131529@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'shariarhosain131529@gmail.com',
      link: 'mailto:shariarhosain131529@gmail.com',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '01757525035',
      link: 'tel:01757525035',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'North Kafrul, Kachukhat, Dhaka, Bangladesh',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Your message..."
                ></textarea>
              </div>
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400"
                >
                  <FaCheckCircle />
                  <span>Your email client should open with the message ready to send!</span>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400"
                >
                  <FaExclamationTriangle />
                  <span>Failed to send message. Please try again or contact me directly.</span>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05, boxShadow: isSubmitting ? "none" : "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  x: 10,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                }}
                className="flex items-center space-x-4 p-6 bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="text-3xl text-cyan-400 group-hover:text-white transition-colors duration-300">{info.icon}</div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{info.title}</h4>
                  <p className="text-gray-300">{info.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl"
            >
              <h4 className="text-2xl font-bold mb-4">Let's Work Together!</h4>
              <p className="leading-relaxed">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, I'll try my best
                to get back to you!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
