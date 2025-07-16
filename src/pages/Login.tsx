
/* eslint-disable react/react-in-jsx-scope */
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { API_URL } from '../consts';
import { useNavigate } from 'react-router-dom';

export function Login() {

    const navigate = useNavigate();

    const validateToken = async () => {
            const res =  await fetch(`${API_URL}/login`)
            const data = await res.json()

            if(res.ok){
               navigate('/home') 
            }
    }

    useEffect(() =>{
        validateToken()
    }, [])

    const handleSubmit = () => {
        
    }

    const labelColor = useColorModeValue('gray.800', 'gray.200')

    return (

        <section className="flex flex-col items-center justify-center w-full h-screen min-h-screen">
            {/* <div className="max-w-[450px] border-4 border-gray-900 w-full h-full rounded-2xl">  */}
            <div className="h-full max-w-[450px] py-4 mx-auto my-auto md:py-9 md:w-7/12">
                <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-white min-w-min ">

                    <div className="w-full text-lg">
                        <FormControl className="flex flex-col items-center justify-center gap-5 " onSubmit={handleSubmit}>
                            <p className="text-xl  text-black font-bold size md:text-2xl">Iniciar sesión</p>

                            <div className="w-full ">
                                <FormLabel color="text.dark" _light={{ color: 'text.light' }} htmlFor="email">Correo Electrónicoca</FormLabel>
                                <Input color="text.dark" _light={{ color: 'text.light' }} type="text" id="email" name="correo"  placeholder='Ingresa tu correo'  />
                            </div>
                            {/* <input type="text" id="user" className="w-full transition-all duration-300 ease-in-out border-4 border-black rounded-lg outline-none hover:border-blue-400 focus:border-blue-600" /> */}
                            <div className="w-full">
                                <FormLabel color={labelColor} htmlFor="password">Contraseña</FormLabel>
                                <Input id="password" name="contrasena" className="inputForm" type="password" placeholder='Ingresa tu contraseña' />
                            </div>

                            <Button className="w-40 transition-all duration-300 ease-in border-2 border-transparent hover:cursor-pointer hover:border-blue-900 bg-sky-300 rounded-xl">Acceder</Button>
                        </FormControl>
                    </div>

                </div>
            </div>

            {/* <div> */}
                {/* <ToastContainer position='bottom-center' autoClose={3000} /> */}
            {/* </div> */}
        </section>
    )
}