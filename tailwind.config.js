module.exports = {
  mode: "jit",
  content: [    "./pages/**/*.{js,ts,jsx,tsx}",    "./components/**/*.{js,ts,jsx,tsx}",  ],
  theme: {
    colors: {
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        "reminderse": {
          'primary': '#50287d',
          'primary-focus': '#391461',
          'primary-content': '#f7f7f7',
          'secondary': '#e8525f',
          'secondary-focus': '#e83645',
          'secondary-content': '#dadada',
          'accent': '#a48bdb',
          'accent-focus': '#8f63f3',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#dc3545',
          'gray': "#615060",
          'white': '#ffffff',
        }
      }
    ]
  }
}
