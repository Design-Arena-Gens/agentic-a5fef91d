'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Users,
  MessageSquare,
  LayoutDashboard,
  BedDouble,
  FileText,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import VitalsMonitor from '@/components/VitalsMonitor';
import BedSimulation from '@/components/BedSimulation';
import ChatInterface from '@/components/ChatInterface';

type TabType = 'overview' | 'beds' | 'chat';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
    { id: 'beds' as TabType, label: 'Bed Management', icon: BedDouble },
    { id: 'chat' as TabType, label: 'AI Assistant', icon: MessageSquare },
  ];

  const quickStats = [
    {
      label: 'Total Patients',
      value: '48',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Critical Cases',
      value: '5',
      change: '-1',
      trend: 'down',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600'
    },
    {
      label: 'Occupied Beds',
      value: '45/60',
      change: '75%',
      trend: 'neutral',
      icon: BedDouble,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Avg Response Time',
      value: '0.8s',
      change: '-0.2s',
      trend: 'down',
      icon: Activity,
      color: 'from-green-500 to-green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white heartbeat" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Clinical Decision Support</h1>
                <p className="text-sm text-gray-500">Real-time patient monitoring & AI analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-gray-700">Dr. Sarah Johnson</p>
                <p className="text-xs text-gray-500">Chief Medical Officer</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                SJ
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition relative ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' :
                        stat.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                         stat.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Vitals Monitor */}
              <VitalsMonitor />
            </motion.div>
          )}

          {activeTab === 'beds' && (
            <motion.div
              key="beds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BedSimulation />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
