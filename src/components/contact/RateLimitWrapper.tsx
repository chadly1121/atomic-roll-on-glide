
import React, { useState, useEffect } from 'react';

interface RateLimitWrapperProps {
  children: (canSubmit: boolean, resetTime: number | null) => React.ReactNode;
  maxAttempts?: number;
  windowMs?: number;
}

const RateLimitWrapper = ({ 
  children, 
  maxAttempts = 3, 
  windowMs = 15 * 60 * 1000 // 15 minutes
}: RateLimitWrapperProps) => {
  const [attempts, setAttempts] = useState<number[]>([]);
  const [resetTime, setResetTime] = useState<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    const validAttempts = attempts.filter(attempt => now - attempt < windowMs);
    
    if (validAttempts.length !== attempts.length) {
      setAttempts(validAttempts);
    }

    if (validAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...validAttempts);
      setResetTime(oldestAttempt + windowMs);
    } else {
      setResetTime(null);
    }
  }, [attempts, maxAttempts, windowMs]);

  const canSubmit = attempts.length < maxAttempts;

  const recordAttempt = () => {
    setAttempts(prev => [...prev, Date.now()]);
  };

  // Expose recordAttempt through a custom event
  useEffect(() => {
    const handleRecordAttempt = () => recordAttempt();
    document.addEventListener('record-form-attempt', handleRecordAttempt);
    return () => document.removeEventListener('record-form-attempt', handleRecordAttempt);
  }, []);

  return <>{children(canSubmit, resetTime)}</>;
};

export default RateLimitWrapper;
