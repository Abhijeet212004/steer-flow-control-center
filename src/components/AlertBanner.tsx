
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AlertData {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  machineId?: string;
}

const AlertBanner: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Temperature Alert',
      message: 'Steering Assembly Line 2 (ST-002) temperature has exceeded 80°C threshold.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      machineId: 'ST-002'
    },
    {
      id: '2',
      type: 'error',
      title: 'Machine Offline',
      message: 'Packaging Unit (ST-004) has gone offline. Production halted.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      machineId: 'ST-004'
    }
  ]);

  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  // Rotate through alerts every 5 seconds
  useEffect(() => {
    if (alerts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentAlertIndex(prev => (prev + 1) % alerts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts.length]);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const newAlert: AlertData = {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? 'error' : 'warning',
          title: Math.random() > 0.5 ? 'Temperature Alert' : 'Efficiency Drop',
          message: `Machine ST-00${Math.floor(Math.random() * 5) + 1} requires attention.`,
          timestamp: new Date(),
          machineId: `ST-00${Math.floor(Math.random() * 5) + 1}`
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // Keep max 5 alerts
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (currentAlertIndex >= alerts.length - 1) {
      setCurrentAlertIndex(0);
    }
  };

  const getAlertStyles = (type: AlertData['type']) => {
    switch (type) {
      case 'error':
        return {
          className: 'border-red-500/50 bg-red-500/10 glass-effect',
          iconColor: 'text-red-400',
          badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
      case 'warning':
        return {
          className: 'border-yellow-500/50 bg-yellow-500/10 glass-effect',
          iconColor: 'text-yellow-400',
          badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        };
      default:
        return {
          className: 'border-blue-500/50 bg-blue-500/10 glass-effect',
          iconColor: 'text-blue-400',
          badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        };
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  if (alerts.length === 0) return null;

  const currentAlert = alerts[currentAlertIndex];
  const styles = getAlertStyles(currentAlert.type);

  return (
    <div className="mb-6 animate-slide-in">
      <Alert className={`${styles.className} border-2 transition-all duration-500 hover:scale-[1.02]`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-5 w-5 ${styles.iconColor} animate-pulse-glow`} />
              <Badge className={styles.badgeColor}>
                {currentAlert.type.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white text-shadow">
                  {currentAlert.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  {currentAlert.machineId && (
                    <Badge variant="outline" className="text-industrial-blue border-industrial-blue">
                      {currentAlert.machineId}
                    </Badge>
                  )}
                  <span>{formatTimestamp(currentAlert.timestamp)}</span>
                </div>
              </div>
              
              <AlertDescription className="text-gray-300">
                {currentAlert.message}
              </AlertDescription>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {alerts.length > 1 && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentAlertIndex(prev => 
                    prev === 0 ? alerts.length - 1 : prev - 1
                  )}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  ‹
                </Button>
                <span className="text-xs text-gray-500 px-2">
                  {currentAlertIndex + 1} / {alerts.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentAlertIndex(prev => 
                    (prev + 1) % alerts.length
                  )}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                >
                  ›
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAlert(currentAlert.id)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-red-500/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {alerts.length > 1 && (
          <div className="mt-3 flex space-x-1">
            {alerts.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index === currentAlertIndex 
                    ? styles.iconColor.replace('text-', 'bg-')
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </Alert>
    </div>
  );
};

export default AlertBanner;
