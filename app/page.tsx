'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, FileText, HeartPulse, Shield, Stethoscope, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Track patient vitals continuously with advanced analytics and instant alerts',
    },
    {
      icon: Users,
      title: 'Bed Management',
      description: 'Visual hospital bed simulation with complete patient data and occupancy tracking',
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Multiple LLM models analyze medical documents, MRIs, CT scans, and EHR data',
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'Upload and query PDFs, medical images, and patient records instantly',
    },
    {
      icon: Shield,
      title: 'Clinical Decision Support',
      description: 'Evidence-based recommendations for improved patient outcomes',
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get immediate answers to complex medical queries with AI assistance',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Monitoring' },
    { value: '<1s', label: 'Response Time' },
    { value: '100%', label: 'HIPAA Compliant' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MediCare AI</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Launch Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Next-Generation Clinical
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Decision Support System
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering healthcare professionals with AI-driven insights, real-time patient monitoring,
              and intelligent medical document analysis for better clinical outcomes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Animated medical icon */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse-slow" />
              <div className="absolute inset-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Stethoscope className="w-32 h-32 text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for modern healthcare delivery</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Patient Care?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join healthcare professionals using AI-powered clinical decision support
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Access Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HeartPulse className="w-6 h-6" />
            <span className="text-xl font-bold">MediCare AI</span>
          </div>
          <p className="text-gray-400 mb-4">
            Advanced Clinical Decision Support System
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 MediCare AI. All rights reserved. HIPAA Compliant.
          </p>
        </div>
      </footer>
    </div>
  );
}
