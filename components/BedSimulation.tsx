'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble,
  User,
  Clock,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  Calendar,
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  diagnosis: string;
  bedNumber: string;
  room: string;
  floor: number;
  status: 'stable' | 'critical' | 'observation' | 'recovery';
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
  assignedDoctor: string;
  lastCheckup: string;
}

export default function BedSimulation() {
  const [beds, setBeds] = useState<Patient[]>([]);
  const [selectedBed, setSelectedBed] = useState<Patient | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Generate simulated patient data
    const generatePatients = (): Patient[] => {
      const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Maria'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
      const diagnoses = [
        'Pneumonia',
        'Cardiac Arrest',
        'Diabetes Management',
        'Post-Surgery Recovery',
        'Hypertension',
        'Asthma',
        'Fractured Femur',
        'COVID-19',
      ];
      const doctors = ['Dr. Wilson', 'Dr. Anderson', 'Dr. Taylor', 'Dr. Martinez', 'Dr. Johnson'];
      const statuses: Array<'stable' | 'critical' | 'observation' | 'recovery'> = [
        'stable',
        'critical',
        'observation',
        'recovery',
      ];

      const patients: Patient[] = [];
      for (let floor = 1; floor <= 3; floor++) {
        for (let room = 1; room <= 5; room++) {
          for (let bed = 1; bed <= 3; bed++) {
            const bedNum = `${floor}${String(room).padStart(2, '0')}${bed}`;
            // 75% occupancy rate
            if (Math.random() > 0.25) {
              const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
              const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
              patients.push({
                id: `P${bedNum}`,
                name: `${firstName} ${lastName}`,
                age: Math.floor(Math.random() * 60) + 20,
                gender: Math.random() > 0.5 ? 'Male' : 'Female',
                admissionDate: new Date(
                  Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000
                ).toLocaleDateString(),
                diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
                bedNumber: bedNum,
                room: `${floor}${String(room).padStart(2, '0')}`,
                floor,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                vitals: {
                  heartRate: Math.floor(Math.random() * 40) + 60,
                  bloodPressure: `${Math.floor(Math.random() * 30) + 110}/${Math.floor(Math.random() * 20) + 70}`,
                  temperature: parseFloat((Math.random() * 2 + 36.5).toFixed(1)),
                  oxygenSat: Math.floor(Math.random() * 5) + 95,
                },
                assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
                lastCheckup: `${Math.floor(Math.random() * 3) + 1}h ago`,
              });
            }
          }
        }
      }
      return patients;
    };

    setBeds(generatePatients());
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'observation':
        return 'bg-yellow-500';
      case 'recovery':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'observation':
        return 'bg-yellow-50 border-yellow-200';
      case 'recovery':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const filteredBeds = beds.filter((bed) => {
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    const matchesSearch =
      searchTerm === '' ||
      bed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.bedNumber.includes(searchTerm) ||
      bed.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: beds.length,
    available: 60 - beds.length,
    critical: beds.filter((b) => b.status === 'critical').length,
    stable: beds.filter((b) => b.status === 'stable').length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <BedDouble className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <div className="text-sm text-gray-600">Occupied Beds</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.available}</span>
          </div>
          <div className="text-sm text-gray-600">Available Beds</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.critical}</span>
          </div>
          <div className="text-sm text-gray-600">Critical Patients</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.stable}</span>
          </div>
          <div className="text-sm text-gray-600">Stable Patients</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, bed number, or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="stable">Stable</option>
              <option value="critical">Critical</option>
              <option value="observation">Observation</option>
              <option value="recovery">Recovery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Hospital Beds ({filteredBeds.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-2">
              {filteredBeds.map((bed) => (
                <motion.div
                  key={bed.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedBed?.id === bed.id
                      ? 'border-blue-500 bg-blue-50'
                      : `border-gray-200 hover:border-gray-300 ${getStatusBgColor(bed.status)}`
                  }`}
                  onClick={() => setSelectedBed(bed)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">Bed {bed.bedNumber}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(bed.status)}`} />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900">{bed.name}</div>
                    <div className="text-sm text-gray-600">
                      {bed.age}y • {bed.gender}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{bed.diagnosis}</div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Heart className="w-4 h-4" />
                        {bed.vitals.heartRate}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Activity className="w-4 h-4" />
                        {bed.vitals.oxygenSat}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
            {selectedBed ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        selectedBed.status
                      )}`}
                    >
                      {selectedBed.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{selectedBed.name}</div>
                      <div className="text-sm text-gray-600">
                        {selectedBed.age} years • {selectedBed.gender}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Bed Number</div>
                          <div className="font-semibold text-gray-900">{selectedBed.bedNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Floor</div>
                          <div className="font-semibold text-gray-900">Floor {selectedBed.floor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Medical Information</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Diagnosis</div>
                      <div className="font-medium text-gray-900">{selectedBed.diagnosis}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Assigned Doctor</div>
                      <div className="font-medium text-gray-900">{selectedBed.assignedDoctor}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Admitted: {selectedBed.admissionDate}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Last checkup: {selectedBed.lastCheckup}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Current Vitals</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-gray-700">Heart Rate</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {selectedBed.vitals.heartRate} bpm
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-700">Blood Pressure</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {selectedBed.vitals.bloodPressure}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-gray-700">Temperature</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {selectedBed.vitals.temperature}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700">Oxygen Sat</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {selectedBed.vitals.oxygenSat}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BedDouble className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a bed to view patient details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
