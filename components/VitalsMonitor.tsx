'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Heart, Thermometer, Wind, Droplets, Activity, AlertTriangle } from 'lucide-react';

interface VitalSign {
  id: string;
  name: string;
  value: number;
  unit: string;
  normal: { min: number; max: number };
  icon: any;
  color: string;
  trend: number[];
}

export default function VitalsMonitor() {
  const [selectedPatient, setSelectedPatient] = useState('P001');
  const [vitals, setVitals] = useState<VitalSign[]>([
    {
      id: 'hr',
      name: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      normal: { min: 60, max: 100 },
      icon: Heart,
      color: '#ef4444',
      trend: [70, 68, 72, 75, 71, 72],
    },
    {
      id: 'temp',
      name: 'Temperature',
      value: 37.2,
      unit: '°C',
      normal: { min: 36.1, max: 37.2 },
      icon: Thermometer,
      color: '#f97316',
      trend: [37.0, 37.1, 37.2, 37.1, 37.2, 37.2],
    },
    {
      id: 'bp',
      name: 'Blood Pressure',
      value: 120,
      unit: 'mmHg',
      normal: { min: 90, max: 140 },
      icon: Activity,
      color: '#8b5cf6',
      trend: [118, 120, 122, 119, 121, 120],
    },
    {
      id: 'rr',
      name: 'Respiratory Rate',
      value: 16,
      unit: 'breaths/min',
      normal: { min: 12, max: 20 },
      icon: Wind,
      color: '#06b6d4',
      trend: [15, 16, 15, 17, 16, 16],
    },
    {
      id: 'spo2',
      name: 'Oxygen Saturation',
      value: 98,
      unit: '%',
      normal: { min: 95, max: 100 },
      icon: Droplets,
      color: '#10b981',
      trend: [97, 98, 98, 97, 98, 98],
    },
  ]);

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) =>
        prev.map((vital) => {
          const variation = (Math.random() - 0.5) * 5;
          const newValue = Math.max(
            vital.normal.min,
            Math.min(vital.normal.max, vital.value + variation)
          );
          const newTrend = [...vital.trend.slice(1), newValue];
          return { ...vital, value: parseFloat(newValue.toFixed(1)), trend: newTrend };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateChartData = () => {
      const data = [];
      const now = Date.now();
      for (let i = 11; i >= 0; i--) {
        const time = new Date(now - i * 5 * 60 * 1000);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          heartRate: 70 + Math.random() * 10,
          bloodPressure: 115 + Math.random() * 10,
          oxygenSat: 96 + Math.random() * 3,
          temperature: 36.8 + Math.random() * 0.6,
        });
      }
      return data;
    };

    setChartData(generateChartData());

    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          heartRate: 70 + Math.random() * 10,
          bloodPressure: 115 + Math.random() * 10,
          oxygenSat: 96 + Math.random() * 3,
          temperature: 36.8 + Math.random() * 0.6,
        });
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const patients = [
    { id: 'P001', name: 'John Smith', room: '101', status: 'stable' },
    { id: 'P002', name: 'Emma Wilson', room: '102', status: 'critical' },
    { id: 'P003', name: 'Michael Brown', room: '103', status: 'stable' },
    { id: 'P004', name: 'Sarah Davis', room: '104', status: 'observation' },
  ];

  const isVitalNormal = (vital: VitalSign) => {
    return vital.value >= vital.normal.min && vital.value <= vital.normal.max;
  };

  return (
    <div className="space-y-6">
      {/* Patient Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Patient</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient.id)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                selectedPatient === patient.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{patient.name}</div>
              <div className="text-sm text-gray-500">Room {patient.room}</div>
              <div className={`mt-2 inline-block px-2 py-1 rounded text-xs font-medium ${
                patient.status === 'critical' ? 'bg-red-100 text-red-700' :
                patient.status === 'observation' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vital Signs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {vitals.map((vital, index) => (
          <motion.div
            key={vital.id}
            className={`bg-white rounded-xl p-6 shadow-sm border ${
              isVitalNormal(vital) ? 'border-gray-100' : 'border-red-300 bg-red-50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${vital.color}20` }}
              >
                <vital.icon className="w-6 h-6" style={{ color: vital.color }} />
              </div>
              {!isVitalNormal(vital) && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {vital.value}
              <span className="text-lg text-gray-500 ml-1">{vital.unit}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">{vital.name}</div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vital.trend.map((v, i) => ({ value: v }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={vital.color}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Normal: {vital.normal.min}-{vital.normal.max} {vital.unit}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate & Blood Pressure */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Heart Rate & Blood Pressure Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Heart Rate (bpm)"
              />
              <Line
                type="monotone"
                dataKey="bloodPressure"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="Blood Pressure (mmHg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Oxygen Saturation & Temperature */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Oxygen Saturation & Temperature
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="oxygenSat"
                stroke="#10b981"
                fill="#10b98120"
                strokeWidth={2}
                name="Oxygen Saturation (%)"
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                fill="#f9731620"
                strokeWidth={2}
                name="Temperature (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Elevated Heart Rate</div>
              <div className="text-sm text-gray-600">
                Patient P002 - Emma Wilson - Heart rate at 105 bpm (10 mins ago)
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Activity className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Vitals Normalized</div>
              <div className="text-sm text-gray-600">
                Patient P001 - John Smith - All vitals within normal range (15 mins ago)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
