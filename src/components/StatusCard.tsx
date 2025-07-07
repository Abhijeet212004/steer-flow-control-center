
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'from-industrial-blue/20 to-industrial-blue/5 border-industrial-blue/30',
    green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    yellow: 'from-industrial-yellow/20 to-industrial-yellow/5 border-industrial-yellow/30',
    red: 'from-red-500/20 to-red-500/5 border-red-500/30'
  };

  const iconColors = {
    blue: 'text-industrial-blue',
    green: 'text-emerald-500',
    yellow: 'text-industrial-yellow',
    red: 'text-red-500'
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} border glass-effect animate-fade-in hover:scale-105 transition-all duration-300 cursor-pointer group`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColors[color]} group-hover:scale-110 transition-transform`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-1 text-shadow">
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                {subtitle}
              </p>
            )}
          </div>
          {trend && (
            <div className={`flex items-center text-xs ${
              trend.isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <span className={`inline-block w-0 h-0 mr-1 ${
                trend.isPositive 
                  ? 'border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-emerald-400'
                  : 'border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-red-400'
              }`} />
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
