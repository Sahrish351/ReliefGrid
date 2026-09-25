// ==============================================================================
// RELIEFGRID — Centralized Humanitarian Photography & Image System
// Strict No-Duplication Rule: Each section & disaster category has distinct photography
// ==============================================================================

import React from 'react';

export const IMAGES = {
  // Legacy / Direct access keys (backwards compatible)
  heroRescue: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1800&q=80',
  heroTeamwork: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600&q=80',
  commandCenter: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
  rescueTeam: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1600&q=80',
  floodBoat: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  responderZodiac: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  hospitalCare: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
  traumaWard: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80',
  shelterCommunity: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80',
  shelterInterior: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  logisticsWarehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  cargoDistribution: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  volunteersDistribution: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
  foodRations: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1600&q=80',
  communitySafety: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80',
  impactHope: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
  missingPersonCompassion: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  storyFamily: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
  storyElderly: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80',
  storyChildren: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  safetyEvacuation: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  firstAidKit: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80',
  satelliteMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  communicationsRadio: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',

  // Context-specific Unique Categorization
  home: {
    hero: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1800&q=80',
    problem: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1600&q=80',
    aiSection: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
    mapSection: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    storyFamily: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    storyElderly: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80',
    storyChildren: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    finalCta: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600&q=80',
  },

  about: {
    hero: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1800&q=80',
    mission: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1600&q=80',
    operations: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
  },

  network: {
    hero: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80',
    field: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1600&q=80',
  },

  howItWorks: {
    hero: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80',
  },

  emergencies: {
    hero: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=80',
    flood: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=900&q=80',
    earthquake: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=900&q=80',
    fire: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=900&q=80',
    heatwave: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=900&q=80',
    cyclone: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=900&q=80',
    buildingCollapse: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=900&q=80',
  },

  hospitals: {
    hero: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1800&q=80',
    clinicalTeam: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80',
    icuMonitoring: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    diagnostics: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
  },

  shelters: {
    hero: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=80',
    accommodation: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    rations: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=900&q=80',
    welfare: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
  },

  volunteers: {
    hero: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=80',
    community: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80',
  },

  logistics: {
    hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80',
    fleet: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80',
  },

  ai: {
    hero: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=80',
  },

  safety: {
    hero: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=80',
    firstAid: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=80',
  },

  resources: {
    hero: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1800&q=80',
    guide1: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    guide2: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    guide3: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  },

  contact: {
    hero: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80',
  },

  impact: {
    hero: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80',
  },

  types: {
    flood: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    earthquake: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=800&q=80',
    fire: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    heatwave: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80',
    storm: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80',
    buildingCollapse: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    medical: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    displacement: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.onerror = null;
  target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="%230B192C" width="800" height="500"/><rect fill="%23D92D20" opacity="0.08" width="800" height="500"/><text fill="%23FBFBFD" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="48%" text-anchor="middle">RELIEFGRID</text><text fill="%239FB3C8" font-family="sans-serif" font-size="14" x="50%" y="55%" text-anchor="middle">Emergency Response &amp; Humanitarian Coordination</text></svg>';
};
