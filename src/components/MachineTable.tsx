
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Settings } from 'lucide-react';

interface Machine {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  temperature: number;
  production: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

const MachineTable: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: 'ST-001',
      name: 'Steering Assembly Line 1',
      status: 'online',
      temperature: 72,
      production: 245,
      efficiency: 94,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 'ST-002', 
      name: 'Steering Assembly Line 2',
      status: 'warning',
      temperature: 84,
      production: 198,
      efficiency: 78,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10'
    },
    {
      id: 'ST-003',
      name: 'Quality Control Station',
      status: 'online',
      temperature: 68,
      production: 312,
      efficiency: 96,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20'
    },
    {
      id: 'ST-004',
      name: 'Packaging Unit',
      status: 'offline',
      temperature: 45,
      production: 0,
      efficiency: 0,
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-04-08'
    },
    {
      id: 'ST-005',
      name: 'Material Handling System',
      status: 'online',
      temperature: 76,
      production: 180,
      efficiency: 88,
      lastMaintenance: '2024-01-18',
      nextMaintenance: '2024-04-18'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(machine => ({
        ...machine,
        temperature: machine.status === 'offline' 
          ? machine.temperature 
          : Math.max(40, Math.min(95, machine.temperature + (Math.random() - 0.5) * 4)),
        production: machine.status === 'offline' 
          ? 0 
          : Math.max(0, machine.production + Math.floor((Math.random() - 0.5) * 10)),
        efficiency: machine.status === 'offline'
          ? 0
          : Math.max(0, Math.min(100, machine.efficiency + (Math.random() - 0.5) * 6))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: Machine['status']) => {
    const variants = {
      online: { className: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'Online' },
      warning: { className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Warning' },
      offline: { className: 'bg-red-500/20 text-red-400 border-red-500/30', text: 'Offline' }
    };
    
    const variant = variants[status];
    return (
      <Badge className={`${variant.className} hover:scale-105 transition-transform`}>
        {variant.text}
      </Badge>
    );
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-400';
    if (efficiency >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 85) return 'text-red-400 font-bold';
    if (temp >= 80) return 'text-yellow-400';
    return 'text-blue-400';
  };

  return (
    <Card className="bg-industrial-gray/50 border-industrial-gray-light glass-effect animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold text-shadow">
            Machine Health Status
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400">
              {machines.filter(m => m.status === 'online').length} Online • 
              {machines.filter(m => m.status === 'warning').length} Warning • 
              {machines.filter(m => m.status === 'offline').length} Offline
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-industrial-gray-light">
          <Table>
            <TableHeader className="bg-industrial-darker/50">
              <TableRow className="border-industrial-gray-light hover:bg-industrial-darker/70">
                <TableHead className="text-gray-300 font-semibold">Machine ID</TableHead>
                <TableHead className="text-gray-300 font-semibold">Name</TableHead>
                <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                <TableHead className="text-gray-300 font-semibold">Temperature</TableHead>
                <TableHead className="text-gray-300 font-semibold">Production</TableHead>
                <TableHead className="text-gray-300 font-semibold">Efficiency</TableHead>
                <TableHead className="text-gray-300 font-semibold">Next Maintenance</TableHead>
                <TableHead className="text-gray-300 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine, index) => (
                <TableRow 
                  key={machine.id} 
                  className={`border-industrial-gray-light hover:bg-industrial-gray-light/30 transition-colors animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-mono text-industrial-blue font-semibold">
                    {machine.id}
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    {machine.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`status-indicator ${machine.status}`}></div>
                      {getStatusBadge(machine.status)}
                    </div>
                  </TableCell>
                  <TableCell className={getTemperatureColor(machine.temperature)}>
                    {Math.round(machine.temperature)}°C
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    {machine.production}
                  </TableCell>
                  <TableCell className={`font-semibold ${getEfficiencyColor(machine.efficiency)}`}>
                    {Math.round(machine.efficiency)}%
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(machine.nextMaintenance).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-industrial-blue hover:text-industrial-blue-light hover:bg-industrial-blue/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-industrial-darker/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {machines.filter(m => m.status === 'online').length}
            </div>
            <div className="text-sm text-gray-400">Machines Online</div>
          </div>
          <div className="bg-industrial-darker/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {Math.round(machines.reduce((acc, m) => acc + m.production, 0) / machines.length)}
            </div>
            <div className="text-sm text-gray-400">Avg Production</div>
          </div>
          <div className="bg-industrial-darker/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length)}%
            </div>
            <div className="text-sm text-gray-400">Overall Efficiency</div>
          </div>
          <div className="bg-industrial-darker/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {machines.filter(m => m.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-400">Alerts Active</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineTable;
