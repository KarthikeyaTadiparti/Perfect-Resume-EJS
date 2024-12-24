/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./views/**/*.ejs",  
    "./public/**/*.js"   
  ],
  theme: {
    extend: {
      colors: {
        'pri-blue': '#004E98',
        'dark-pri-blue': '#02417b',
        'background' : '#F8F8F8'
      },
    },
  },
  plugins: [],
}

