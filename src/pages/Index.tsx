import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '@/components/RoleSelector';

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'boss' | 'assistant') => {
    navigate('/dashboard', { state: { selectedRole: role } });
  };

  return (
    <RoleSelector onRoleSelect={handleRoleSelect} />
  );
};

export default Index;