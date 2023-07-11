/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "bg-login": "#579B0F",
        "form-login": "#F6FCF1",
        "button": "#F2F3F4",
        "side": "#466233",
        "side-text": "#ddc7b3"
      },
      maxWidth:{
        custom: '280px'
      }
    },
  },
  plugins: [],
}

