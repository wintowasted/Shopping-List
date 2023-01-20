import React, {useState, useRef, useEffect} from 'react'
import loginImage from '../assets/loginImage.jpg'
import {AiFillInfoCircle} from 'react-icons/ai'
import { Link, useNavigate} from 'react-router-dom';
import {register} from '../api/axios'

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{7,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_\.]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {

    const navigate = useNavigate();

    const userNameRef = useRef();
    const errRef = useRef();

    // user name
    const [userName, setUserName] = useState("");
    const [validUserName, setValidUserName] = useState(false)
    const [userNameFocus, setUserNameFocus] = useState(false)

    // email
    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    // password
    const [password, setPassword] = useState("");  
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    // verify password
    const [matchPassword, setMatchPassword] = useState("")
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    // error message
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
      userNameRef.current.focus()
    }, [])
    
    useEffect(() => {
        setValidUserName(USERNAME_REGEX.test(userName))
    }, [userName])
    
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
        setValidMatchPassword(password === matchPassword)
    }, [password, matchPassword])
    
    useEffect(() => {
        setErrorMessage("")
    }, [userName, email, password, matchPassword])


    const registerUser = async (e) => {
        e.preventDefault()
        
        try {
            await register({userName, email, password})

            // Clear all inputs
            setUserName('')
            setEmail('')
            setPassword('')
            setMatchPassword('')
            navigate('/login');
        } catch (error) {
            setErrorMessage(error?.response?.data.errors)
        }
    }


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden  sm:block  overflow-hidden '>
        <img className='w-full h-full object-cover' src={loginImage} alt="login-img" />
        </div>
        <section className='bg-gray-400 flex flex-col justify-center items-center'>

            {/* REGISTER FORM */}
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 rounded-lg' onSubmit={registerUser}>
                <h2 className='text-4xl dark:text-white font-bold text-center'>REGISTER</h2>


               
                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="username">User Name</label>
                    <input required id='username' ref={userNameRef} autoComplete="off" value={userName} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"  onChange={(e) => setUserName(e.target.value)} onFocus={() => setUserNameFocus(true)} onBlur={() => setUserNameFocus(false)}/>
                </div>

                {/* UserName error message */}
                <div className={userNameFocus && userName && !validUserName ? "text-red-600 text-sm flex gap-x-2 " : 'hidden'}> <div className='pt-1' ><AiFillInfoCircle/></div> <span>8 to 20 charactes. <br />Must begin with a letter</span></div>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="email">Email</label>
                    <input required id='email' autoComplete='off' value={email} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"  onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}/>
                </div>

                 {/* UserName error message */}
                 <div className={emailFocus && email && !validEmail ? "text-red-600 text-sm flex gap-x-2 " : 'hidden'}> <div className='pt-1' ><AiFillInfoCircle/></div> <span>Must be an email address</span></div>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="password">Password</label>
                    <input required id='password' value={password} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'type="password"  onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}/>
                </div>

                {/* Password error message */}
                <div className={passwordFocus && password && !validPassword ? "text-red-600 text-sm flex gap-x-2 " : 'hidden'}> <div className='pt-1' ><AiFillInfoCircle/></div> <span>8 to 24 characters. <br /> Must include uppercase and lowercase letters, a number and a special character.</span></div>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor="match-password">Verify Password</label>
                    <input required id='match-password' value={matchPassword} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'type="password"  onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)}/>
                </div>

                {/* Password error message */}
                <div className={matchPasswordFocus && matchPassword && !validMatchPassword ? "text-red-600 text-sm flex gap-x-2 " : 'hidden'}> <div className='pt-1' ><AiFillInfoCircle/></div> <span>Must match with the first password field!</span></div>

                {/* Error Message */}
                <span ref={errRef} className={errorMessage ? 'text-red-600 text-lg text-center' : 'hidden'}>{errorMessage}</span>

                <button disabled={!validUserName || !validEmail || !validPassword || !validMatchPassword ? true : false} className='w-full bg-teal-500 my-5 py-2 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Sign Up</button>

                <p className='text-white text-md px-1'><span> You have already an account? <br /><Link className='underline' to={'/login'}>Sign In</Link></span></p>

            </form>
        
        
        </section>
    </div>
  )
}

export default Register