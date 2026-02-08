// Distinctive Design System - Organic Minimalism with Sage Green

export const theme = {
  colors: {
    // Primary palette - Organic sage green
    primary: '#83B692',        // Sage green
    primaryDark: '#6B9A7A',    // Darker sage
    primaryLight: '#A5C9B3',   // Lighter sage
    
    // Accent - Warm earth tones
    accent: '#D4A574',         // Warm sand
    accentDark: '#B8895E',     // Deep sand
    
    // Neutrals - Warm grays
    background: '#FDFCFB',     // Warm white
    surface: '#F7F6F4',        // Soft cream
    surfaceDark: '#EBE9E6',    // Warm gray
    border: '#E3E1DD',         // Subtle border
    
    // Text - Natural hierarchy
    textPrimary: '#2D3436',    // Deep charcoal
    textSecondary: '#636E72',  // Medium gray
    textTertiary: '#95A5A6',   // Light gray
    
    // Status
    success: '#83B692',
    warning: '#E8A87C',
    error: '#E17055',
    info: '#74B9D8',
  },
  
  spacing: {
    xs: '6px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
    xxl: '72px',
  },
  
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    xl: '28px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 2px 8px rgba(131, 182, 146, 0.08)',
    md: '0 4px 16px rgba(131, 182, 146, 0.12)',
    lg: '0 8px 32px rgba(131, 182, 146, 0.16)',
    inner: 'inset 0 2px 4px rgba(131, 182, 146, 0.06)',
  },
  
  typography: {
    fontFamily: {
      display: '"Fraunces", "Playfair Display", Georgia, serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '13px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '36px',
      display: '48px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};
