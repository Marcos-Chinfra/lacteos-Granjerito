import React, {useRef, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';

const Login = () => {
    const { getToken, setGetToken, API, errorAlert, successAlert } = useContext(AppContext);
    const [post, setPost] = useState(null)
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [inputData, setInputData] = useState({
        name: '',
        password: ''
    });
    const form = useRef(null);

    useEffect(() => {
        if(post){
            if(post.status === 200){
                successAlert('Todo bien!!', 'El registro se a guardado con éxito.')
            }else if(post.status !== 200){
                errorAlert('No se ha registrado en el inventario.');
            }
        }
    }, [post]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputData({
        ...inputData,
        [name]: value,
        });
    }

    const startLogin = (username, password )=> {

        const headers = {
            'API': '121319'
        }

        axios.post(`${API}/auth/login`, {
            username: username,
            password: password
        }, { headers })
        .then((response)=>{
            let data = response
            setGetToken(data.data.token)
            setPost(data)
        })
        .catch((error) => {
            if (error.response) {
                console.log("Error response data:", error.response.data);
                setPost(error)
            } else if (error.request) {
                console.log("Error request:", error.request);
                setPost(error)
            } else {
                console.log("Error message:", error.message);
                setPost(error)
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current);
        const record = {
            'name': formData.get('name'),
            'password': formData.get('password'),
        }
        if(record.name === ''){
            setErrorName(true)
        }
        else if(record.password === '')
        {
            setErrorPassword(true)
        }
        else 
        {
            setErrorPassword(false)
            setErrorName(false)
            setInputData({
                name: '',
                password: '',
            })
            startLogin(record.name, record.password)
        }
    }
    console.log(getToken)
    console.log(post)

    return (
        <div className="mx-auto w-4/6 max-w-login min-w-log px-4 py-8 lg:py-16 sm:px-6 lg:px-8 lg:mt-10 ">
            <div className="mx-auto max-w-xl">
                <h1 className="text-center text-2xl font-bold text-created sm:text-3xl">
                    Empecemos!!
                </h1>
                <form
                    action=""
                    ref={form}
                    onSubmit={handleSubmit} 
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
                >
                    <p className="text-center text-lg font-medium">Coloca tu cuenta</p>

                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>

                        <div className="relative">
                            <input
                                type="text"
                                name='name'
                                id="name"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-gray-300"
                                placeholder="Coloca tu cuenta"
                                value={inputData.name}
                                onChange={handleInput}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                name='password'
                                id="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-gray-300"
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={handleInput}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-created px-5 py-3 text-sm font-medium border border-created text-white hover:border-liner-color hover:text-liner-color hover:bg-white "
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
        );
    }

export default Login;