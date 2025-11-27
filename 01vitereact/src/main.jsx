import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import {jsx as _jsx} from "react/jsx-runtime.js"
import App from './App.jsx'

// function MyApp(){
//   return(
//     <div>
//       <h1>Custom App</h1>
//     </div>
//   )
// }

// const ReactElement = {
//     type:'a',
//     props : {
//         href: 'https://google.com',
//         target:'_blank'
//     },
//     children:'Click me to visit Google'
// }

const anotherUser = "Mera nam Bishnu hai."

const ReactElement = React.createElement(
  'a',
   {href: 'https://google.com',target:'_blank'},
   'Click me to vist Google',
    anotherUser
)



// const anotherElement = (
//   <a href="https://google.com" target='_blank'>Click me to visit Google</a>
// )

ReactDOM.createRoot(document.getElementById('root')).render(
 ReactElement

  )
