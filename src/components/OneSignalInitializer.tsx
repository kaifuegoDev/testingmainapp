'use client';

import { useEffect } from 'react';
import OneSignalService from '@/services/OneSignalService';

export default function OneSignalInitializer() {
  useEffect(() => {
    // OneSignal initialize karein jab component mount ho
    const initOneSignal = async () => {
      try {
        await OneSignalService.initialize();
      } catch (error) {
        console.error('Failed to initialize OneSignal:', error);
      }
    };

    initOneSignal();
  }, []);

  return null; // Yeh component kuch render nahi karega
}
