/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        "bg-login": "#579B0F",
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
        "orange-title": '#f08229',
        "light-blue": "#E3F2FD",
      },
      maxWidth:{
        custom: '280px',
        buttons: '245px',
        button: '160px',
        updateForm:"307px",
        login: "480px",
        tables: "500px",
        modalForm: "650px",
        pieChartInventory: "440px",
        formInventory: "400px",
        loginLogo:"765px",
      },
      minWidth:{
        log: "300px",
        chart: "270px"
      },
      maxHeight:{
        form: '450px',
        tables: '690px'
      },
      minHeight:{
        buttons: '45px',
        headerProducts: '100px'
      }
    },
  },
  plugins: [],
}

