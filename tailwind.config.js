/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "bg-login": "#579B0F",
        "form-login": "#F6FCF1",
        "button": "#F2F3F4",
        "created": "#11aaff",
        "side": "#206c83",
        // "side-text": "#ddc7b3",
        "liner-color": "#fd8a2d",
        "orange-button": "#F5B041",
        "text-color": "#707695",
        'Magnolia':'hsl(217, 100%, 97%)' ,
        "Error": '#F6630A ',
        'return': '#F0E6D5',
        "strong-blue": '#015db0',
        // "orange-title": '#ca6e23'
        "orange-title": '#f08229'
      },
      maxWidth:{
        custom: '280px',
        button: '160px',
        updateForm:"307px"
      },
      maxHeight:{
        form: '450px'
      }
    },
  },
  plugins: [],
}

