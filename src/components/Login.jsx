import React, {useRef, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const { API, errorAlert, saveToken, saveAccount } = useContext(AppContext);
    const [post, setPost] = useState(null)
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(false)
    const [inputData, setInputData] = useState({
        name: '',
        password: ''
    });
    const form = useRef(null);

    useEffect(() => {
        if(post){
            if(post.status === 200){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Bienvenido ${post.data.user.name}`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    navigate('/inventory');
                })
            }else if(post.status !== 200){
                errorAlert('Revisa tus datos y vuelve a intentarlo.');
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
            saveToken(data.data.token)
            setPost(data)
            saveAccount(data.data.user)
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


    return (
        <div className="mx-auto w-4/6 max-w-login min-w-log px-4 lg:py-16 sm:px-6 lg:px-8 lg:mt-10 ">
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
                                autoComplete='name'
                                id="name"
                                className={`w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-gray-300 ${ errorName ? "border-Error" : 'border-gray-200'}`}
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
                                type={viewPassword ? "text" : "password"}
                                name='password'
                                autoComplete="current-password"
                                id="password"
                                className={`w-full rounded-lg  p-4 pe-12 text-sm shadow-sm outline-gray-300 ${errorPassword ? "border-Error" : "border-gray-200" }`}
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={handleInput}
                            />

                            <button 
                                type='button'
                                onClick={() => setViewPassword(!viewPassword)}
                                className="absolute inset-y-0 end-0 grid place-content-center px-4"
                            >
                                {viewPassword ? <i className="fa-regular fa-eye text-orange-button"></i> : <i className="fa-regular fa-eye-slash text-orange-button"></i>}    
                            </button>
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