'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/settings',
    handler: 'settings.getSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/settings',
    handler: 'settings.updateSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/status',
    handler: 'settings.getStatus',
    config: {
      policies: [],
      auth: false,
    },
  },
]; 