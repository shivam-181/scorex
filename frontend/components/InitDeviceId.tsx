'use client';
import { useEffect } from 'react';

export default function InitDeviceId() {
  useEffect(() => {
    if (!localStorage.getItem('scorex_device_id')) {
      localStorage.setItem('scorex_device_id', crypto.randomUUID());
    }
  }, []);
  return null;
}
