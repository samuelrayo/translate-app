import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './theme/theme.ts'
// import Translate from './pages/Translate.tsx';


// const router = createBrowserRouter([

//   {
//     path: '/', 
//     element: <Protected />, 
//     children: [
//       {
//         path: "/home", 
//         element: <App />
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>

)