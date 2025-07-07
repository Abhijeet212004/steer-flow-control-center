
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TemperatureData {
  time: string;
  temperature: number;
  threshold: number;
}

const TemperatureChart: React.FC = () => {
  const [data, setData] = useState<TemperatureData[]>([]);
  const [currentTemp, setCurrentTemp] = useState(75);

  // Simulate real-time temperature data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const newData: TemperatureData[] = [];
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // Every minute
        const baseTemp = 75 + Math.sin(i * 0.2) * 15;
        const noise = (Math.random() - 0.5) * 8;
        const temperature = Math.max(40, Math.min(95, baseTemp + noise));
        
        newData.push({
          time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          temperature: Math.round(temperature * 10) / 10,
          threshold: 85
        });
      }
      
      setData(newData);
      setCurrentTemp(newData[newData.length - 1].temperature);
    };

    generateData();
    const interval = setInterval(generateData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getTemperatureStatus = (temp: number) => {
    if (temp >= 85) return { status: 'Critical', color: 'bg-red-500', textColor: 'text-red-400' };
    if (temp >= 80) return { status: 'Warning', color: 'bg-yellow-500', textColor: 'text-yellow-400' };
    return { status: 'Normal', color: 'bg-green-500', textColor: 'text-green-400' };
  };

  const tempStatus = getTemperatureStatus(currentTemp);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-industrial-gray border border-industrial-gray-light rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{`Time: ${label}`}</p>
          <p className="text-industrial-blue">
            Temperature: <span className="font-bold">{payload[0].value}°C</span>
          </p>
          <p className="text-red-400">
            Threshold: <span className="font-bold">{payload[1]?.value || 85}°C</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-industrial-gray/50 border-industrial-gray-light glass-effect animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg font-semibold text-shadow">
            Live Temperature Monitoring
          </CardTitle>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`status-indicator ${tempStatus.status.toLowerCase()}`}></div>
              <span className={`text-sm font-medium ${tempStatus.textColor}`}>
                {tempStatus.status}
              </span>
            </div>
            <Badge variant="outline" className="text-white border-industrial-blue bg-industrial-blue/20">
              {currentTemp}°C
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="thresholdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#394155" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="threshold"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#thresholdGradient)"
                opacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#1e40af' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-industrial-darker/50 rounded-lg p-3">
            <div className="text-sm text-gray-400">Current</div>
            <div className="text-xl font-bold text-white">{currentTemp}°C</div>
          </div>
          <div className="bg-industrial-darker/50 rounded-lg p-3">
            <div className="text-sm text-gray-400">Threshold</div>
            <div className="text-xl font-bold text-red-400">85°C</div>
          </div>
          <div className="bg-industrial-darker/50 rounded-lg p-3">
            <div className="text-sm text-gray-400">Average</div>
            <div className="text-xl font-bold text-blue-400">
              {data.length > 0 ? Math.round(data.reduce((acc, d) => acc + d.temperature, 0) / data.length) : 0}°C
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
