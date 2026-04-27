/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'Cairo', 'sans-serif'],
        body: ['Tajawal', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#00666c',
        'on-primary': '#ffffff',
        'primary-container': '#008188',
        'on-primary-container': '#f4ffff',
        secondary: '#4c6363',
        'on-secondary': '#ffffff',
        'secondary-container': '#cee7e7',
        'on-secondary-container': '#526969',
        tertiary: '#8e4a1a',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#ac6230',
        'on-tertiary-container': '#fffbff',
        background: '#f4faff',
        'on-background': '#001f2a',
        surface: '#f4faff',
        'on-surface': '#001f2a',
        'surface-variant': '#c9e7f7',
        'on-surface-variant': '#3d494a',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e6f6ff',
        'surface-container': '#d9f2ff',
        'surface-container-high': '#ceedfd',
        'surface-container-highest': '#c9e7f7',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        outline: '#6d797a',
        'outline-variant': '#bcc9c9',
      },
      borderRadius: {
        'md': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'ambient': '0 12px 40px rgba(0, 31, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
