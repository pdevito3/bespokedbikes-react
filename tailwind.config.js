const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    uniformColorPalette: true,    
    extendedSpacingScale: true,    
    defaultLineHeights: true,
    extendedFontSizeScale: true, // 7xl, 8xl, and 9xl
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    //whenever you compile your CSS with NODE_ENV set to production, Tailwind will automatically purge unused styles from your CSS.
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      gradientColorStops: theme => ({
        grape: '#A65FEC'
      }),
      spacing: {
        // 0.5, 1.5, 2.5, and 3.5 | 72, 80, and 96 | percentage based fractional values to the whole spacing scale (1/2, 5/6, 7/12, etc.) | all added via experimental
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      },
      minHeight: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      },
      gridTemplateColumns: {
       '16': 'repeat(16, minmax(0, 1fr))',
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderStyle: ['responsive', 'hover', 'focus', 'focus-visible'],
  },
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    })
  ]
}
