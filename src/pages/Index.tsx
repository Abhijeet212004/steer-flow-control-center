
import React, { useState } from 'react';
import { Calendar, Clock, Grid2x2, ChartBar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StatusCard from '@/components/StatusCard';
import TemperatureChart from '@/components/TemperatureChart';
import MachineTable from '@/components/MachineTable';
import AlertBanner from '@/components/AlertBanner';

const Index = () => {
  const [userRole, setUserRole] = useState<'worker' | 'head'>('worker');

  return (
    <div className="min-h-screen bg-industrial-dark">
      <Navbar userRole={userRole} onRoleChange={setUserRole} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Alert Banner */}
        <AlertBanner />

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white text-shadow mb-2">
            Steering Manufacturing Dashboard
          </h1>
          <p className="text-gray-400">
            Real-time monitoring and control for industrial steering production
          </p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Today's Production"
            value="1,245"
            subtitle="Steering units"
            icon={Grid2x2}
            trend={{ value: 12, isPositive: true }}
            color="blue"
          />
          <StatusCard
            title="Weekly Total"
            value="8,760"
            subtitle="This week"
            icon={ChartBar}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatusCard
            title="Active Machines"
            value="4/5"
            subtitle="Currently online"
            icon={Clock}
            color="yellow"
          />
          <StatusCard
            title="Efficiency Rate"
            value="89%"
            subtitle="Overall performance"
            icon={Calendar}
            trend={{ value: 3, isPositive: false }}
            color="red"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Temperature Chart - Takes 2 columns on large screens */}
          <div className="xl:col-span-2">
            <TemperatureChart />
          </div>

          {/* Additional Stats Panel */}
          <div className="space-y-6">
            {/* Production Summary */}
            <div className="bg-industrial-gray/50 border border-industrial-gray-light glass-effect rounded-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-4 text-shadow">Production Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Target Today</span>
                  <span className="text-white font-semibold">1,500 units</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Progress</span>
                  <span className="text-green-400 font-semibold">83%</span>
                </div>
                <div className="w-full bg-industrial-darker rounded-full h-2">
                  <div className="bg-gradient-to-r from-industrial-blue to-industrial-yellow h-2 rounded-full" style={{width: '83%'}}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Estimated Completion</span>
                  <span className="text-blue-400 font-semibold">6:30 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {userRole === 'head' && (
              <div className="bg-industrial-gray/50 border border-industrial-gray-light glass-effect rounded-xl p-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-white mb-4 text-shadow">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-industrial-blue hover:bg-industrial-blue-light text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Generate Report
                  </button>
                  <button className="w-full bg-industrial-yellow hover:bg-industrial-yellow-light text-industrial-dark font-medium py-2 px-4 rounded-lg transition-colors">
                    Schedule Maintenance
                  </button>
                  <button className="w-full bg-industrial-gray hover:bg-industrial-gray-light text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Analytics
                  </button>
                </div>
              </div>
            )}

            {/* System Status */}
            <div className="bg-industrial-gray/50 border border-industrial-gray-light glass-effect rounded-xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-4 text-shadow">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="status-indicator online"></div>
                    <span className="text-green-400 text-sm">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">ESP32 Sensors</span>
                  <div className="flex items-center space-x-2">
                    <div className="status-indicator online"></div>
                    <span className="text-green-400 text-sm">5/5 Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="status-indicator warning"></div>
                    <span className="text-yellow-400 text-sm">Latency: 45ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Machine Health Table */}
        <MachineTable />
      </div>
    </div>
  );
};

export default Index;
