// ==============================================================================
// RELIEFGRID AI — Centralized Humanitarian Photography & Visual Assets
// Compliant with 04_RELIEFGRID_UI_UX.md Section 5 & 23
// Verified reliable URLs with responsive widths & fallback treatments
// ==============================================================================

export const IMAGES = {
  // Homepage Hero & Major Banners
  heroRescue: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1600&q=80', // Emergency responders / flood rescue vehicle
  heroTeamwork: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600&q=80', // Dedicated response team planning

  // Emergency Incident Types
  types: {
    flood: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80', // Flood water operations
    earthquake: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=800&q=80', // Search & rescue / structural
    fire: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80', // Fire rescue vehicle
    heatwave: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80', // Heat / sun / hydration
    storm: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80', // Severe weather / storm sky
    buildingCollapse: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80', // Urban rescue teams
    medical: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', // Hospital triage & care
    displacement: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80', // Humanitarian aid community
  },

  // Operational Sections
  commandCenter: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', // Operations room / screens
  rescueTeam: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80', // First responders in action
  hospitalCare: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', // Modern emergency hospital care
  shelterCommunity: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80', // Community support & shelter
  logisticsWarehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', // Relief inventory & logistics
  volunteersDistribution: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80', // Volunteers distributing food & water
  communitySafety: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80', // Community safety & preparedness
  impactHope: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80', // Rebuilding / hope / solidarity
  missingPersonCompassion: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', // Portrait
};

// Safe image component helper with graceful fallback
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.onerror = null;
  // Replace with a clean emergency gradient placeholder
  target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="%23102A43" width="800" height="500"/><rect fill="%23D92D20" opacity="0.1" width="800" height="500"/><text fill="%23F7F8FA" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="48%" text-anchor="middle">RELIEFGRID AI</text><text fill="%239FB3C8" font-family="sans-serif" font-size="14" x="50%" y="55%" text-anchor="middle">Emergency Response &amp; Humanitarian Coordination</text></svg>';
};
