
import React from 'react';

export type BackgroundPreset = {
  id: string;
  name: string;
  class?: string;
  style?: React.CSSProperties;
  thumbnail: React.ReactNode;
};

export type DecorationPreset = {
  id: string;
  name: string;
  isVip?: boolean;
  template: string;
  thumbnail: React.ReactNode;
};

export type BrandPreset = {
  id: string;
  name: string;
  component: React.ReactNode;
  thumbnail: React.ReactNode;
};

export type SidebarTab = 'BACKGROUND' | 'DECORATION' | 'BRAND';
