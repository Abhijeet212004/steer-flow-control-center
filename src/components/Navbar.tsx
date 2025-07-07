
import React, { useState } from 'react';
import { Bell, Settings, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  userRole: 'worker' | 'head';
  onRoleChange: (role: 'worker' | 'head') => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onRoleChange }) => {
  const [notifications] = useState(3);

  return (
    <nav className="bg-industrial-darker border-b border-industrial-gray glass-effect sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-industrial-blue to-industrial-yellow rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-white text-shadow">
                Steering<span className="text-industrial-yellow">IoT</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-industrial-gray">
              Dashboard
            </Button>
            {userRole === 'head' && (
              <>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-industrial-gray">
                  Analytics
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-industrial-gray">
                  Reports
                </Button>
              </>
            )}
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-industrial-gray">
              Machines
            </Button>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-industrial-gray rounded-lg p-1">
              <Button
                size="sm"
                variant={userRole === 'worker' ? 'default' : 'ghost'}
                onClick={() => onRoleChange('worker')}
                className={`text-xs ${userRole === 'worker' ? 'bg-industrial-blue text-white' : 'text-gray-400'}`}
              >
                Worker
              </Button>
              <Button
                size="sm"
                variant={userRole === 'head' ? 'default' : 'ghost'}
                onClick={() => onRoleChange('head')}
                className={`text-xs ${userRole === 'head' ? 'bg-industrial-blue text-white' : 'text-gray-400'}`}
              >
                Head
              </Button>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-industrial-gray border-industrial-gray-light">
                <DropdownMenuLabel className="text-white">
                  {userRole === 'head' ? 'Production Head' : 'Line Worker'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-industrial-gray-light" />
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-industrial-gray-light">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-industrial-gray-light">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-industrial-gray-light" />
                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-industrial-gray-light">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden text-gray-300 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
