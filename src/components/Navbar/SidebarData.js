import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineIcon from '@material-ui/icons/Timeline';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Overall',
    path: '/overall',
    icon: <EqualizerIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Local',
    path: '/local',
    icon: <BarChartIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Comparison',
    path: '/comparison',
    icon: <TimelineIcon />,
    cName: 'nav-text'
  }
];
