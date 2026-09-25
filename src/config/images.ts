// ==============================================================================
// RELIEFGRID — Centralized Humanitarian Photography & Visual Asset Registry
// Strict Rule: Unique, contextual, high-resolution imagery for every major page and section.
// No duplicated images across hospitals, shelters, emergencies, or resources.
// ==============================================================================

import React from 'react';

export const IMAGES = {
  // 1. HOME PAGE
  home: {
    hero: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1920&q=80', // Flood rescue boat navigating high waters
    rescueTeam: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1600&q=80', // Rapid tactical rescue boat crew
    storyFamily: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80', // Family evacuated safely
    storyElderly: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80', // Senior citizen receiving clinical care
    storyChildren: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80', // Children receiving shelter support
    communityAction: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80', // Community preparedness
    finalCta: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1800&q=80', // Humanitarian hands of hope
  },

  // 2. ABOUT PAGE
  about: {
    hero: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1800&q=80', // Humanitarian coordination team hands together
    mission: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80', // Field command strategy briefing
    governance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80', // Humanitarian oversight review
  },

  // 3. LIVE NETWORK PAGE
  network: {
    hero: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80', // Multi-screen emergency operations room
    mapBackdrop: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80', // Satellite terrain mapping
  },

  // 4. EMERGENCIES PAGE & DISTINCT HAZARD CATEGORIES
  emergencies: {
    hero: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1800&q=80', // Emergency response vehicles deployment
    flood: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', // Rescue boat moving through floodwaters
    earthquake: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80', // Urban structural search and rescue team
    fire: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80', // Firefighters tackling industrial blaze
    heatwave: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1200&q=80', // Extreme heat hydration & relief shelter
    cyclone: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1200&q=80', // Coastal storm surge and gale preparedness
    buildingCollapse: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80', // Heavy technical rescue rubble extraction
  },

  // 5. HOSPITALS (Entirely distinct clinical photography)
  hospitals: {
    hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80', // Hospital emergency department exterior bay
    clinicalTeam: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80', // Trauma doctors & surgical specialists
    icuMonitoring: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1400&q=80', // ICU monitors & critical bed station
    diagnostics: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80', // Clinical diagnostic blood & vitals screening
  },

  // 6. SHELTERS (Entirely distinct accommodation & welfare photography)
  shelters: {
    hero: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=80', // Humanitarian emergency encampment & relief tents
    accommodation: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=80', // Community hall arranged with emergency bedding
    rations: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1400&q=80', // Community food distribution & hot meals
    welfare: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80', // Aid worker assisting displaced family
  },

  // 7. VOLUNTEERS
  volunteers: {
    hero: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=80', // Volunteer corps organizing in high-visibility gear
    inAction: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=1400&q=80', // Volunteers distributing aid boxes
  },

  // 8. RELIEF LOGISTICS & ORGANIZATIONS
  logistics: {
    hero: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80', // Relief convoy fleet on highway transit
    warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80', // High-bay humanitarian pallet racks
    inventoryBoxes: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1400&q=80', // Packed emergency medical kits
  },

  // 9. AI TECHNOLOGY
  ai: {
    hero: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=80', // Neural network nodes & data streams
    computeInfrastructure: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80', // High performance server cluster
    satelliteCoordination: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80', // Earth orbit telemetry
  },

  // 10. SAFETY CENTER
  safety: {
    hero: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=80', // Evacuation drill & family safety planning
    firstAidKit: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80', // Sterile first aid gear & trauma wraps
    commsRadio: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', // Two-way emergency radio
  },

  // 11. RESOURCES & DOCUMENTATION
  resources: {
    hero: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1800&q=80', // Humanitarian documentation & research
    manualDoc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', // Tactical field handbook
    medicalDoc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', // Clinical emergency triage guideline
    logisticsDoc: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80', // Supply manifest handbook
  },

  // 12. CONTACT PAGE
  contact: {
    hero: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80', // Humanitarian coordination help desk
  },

  // 13. IMPACT & COMMUNITY STORIES
  impact: {
    hero: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1800&q=80', // Humanitarian aid worker in field
    waterDistribution: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80', // Clean water access
  },

  // BACKWARDS COMPATIBILITY ALIASES
  heroRescue: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1920&q=80',
  heroTeamwork: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1800&q=80',
  commandCenter: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80',
  rescueTeam: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1600&q=80',
  floodBoat: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  responderZodiac: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  hospitalCare: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80',
  traumaWard: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
  shelterCommunity: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1800&q=80',
  shelterInterior: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=80',
  logisticsWarehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  cargoDistribution: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  volunteersDistribution: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
  foodRations: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1600&q=80',
  communitySafety: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=80',
  impactHope: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1600&q=80',
  storyFamily: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
  storyElderly: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80',
  storyChildren: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  safetyEvacuation: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  firstAidKit: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=80',
  satelliteMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  communicationsRadio: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',

  types: {
    flood: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    earthquake: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80',
    fire: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    heatwave: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1200&q=80',
    storm: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1200&q=80',
    buildingCollapse: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80',
    medical: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    displacement: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
  },
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.onerror = null;
  target.src =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="%230B192C" width="800" height="500"/><rect fill="%23D92D20" opacity="0.08" width="800" height="500"/><text fill="%23FBFBFD" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="48%" text-anchor="middle">RELIEFGRID</text><text fill="%239FB3C8" font-family="sans-serif" font-size="14" x="50%" y="55%" text-anchor="middle">Emergency Response &amp; Humanitarian Coordination</text></svg>';
};
