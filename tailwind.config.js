/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",  
    "./public/**/*.js"   
  ],
  theme: {
    extend: {
      colors: {
        'pri-blue': '#004E98',
        'background' : '#F8F8F8'
      },
    },
  },
  plugins: [],
}

