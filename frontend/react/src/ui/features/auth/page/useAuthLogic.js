import { useNavigate } from "react-router-dom";
import request from "../../../../core/remote/axios.js";
import  {  useState } from "react";

const AuthLogic = () => {
    const [registerOrLogin,SetRegisterOrLogin] = useState('register')
  const [step,setStep] = useState(1)
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    place_of_birth: "",
    date_of_birth: "",
    street: "",
    city: "",
    country: "",
    email: "",
    password: "",
    password_confirmation:""
  });
  const navigate = useNavigate()

  const login = async (e) =>{
    e.preventDefault()
    
      const response = await request({
        method:"POST",
        route:"api/v0.1/login",
        body: {
          ...data
        }
      })
      if(response.success){
        localStorage.setItem('access_token',response.data.token);
        localStorage.setItem('user_id',response.data.id);
        localStorage.setItem('name',response.data.first_name)
        navigate('/home');
        console.log('success')
      }
      console.log(response)
    }

  const submit = async (e) =>{
    e.preventDefault()
    if(step<3){
      setStep(step+1);
    }else if(step==3){
     
      const response = await request({
        method:"POST",
        route:"api/v0.1/register",
        body: {
          ...data
        }
      })
      if(response.success){
        localStorage.setItem('access_token',response.data.token)
        localStorage.setItem('user_id',response.data.id)
        localStorage.setItem('name',response.data.first_name)
        navigate('/home');
      }
      console.log(response)
    }
  }
  
  const back = (e) =>{
    e.preventDefault()
    setStep(step-1)
  }
  const handleChange = (e) =>{
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const switchRegLog = () =>{
    if(registerOrLogin=='register'){
      SetRegisterOrLogin('login')
    }else{
      SetRegisterOrLogin('register')
    }
  }
  const handleGoogleLogin = async() =>{
    try{
      const response = await request({
        method:"GET",
        route:'login/google',
      })
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  return {
    registerOrLogin,SetRegisterOrLogin,
    step,setStep,
    data, setData,
    login,
    submit,
    back,handleChange,switchRegLog,
    handleGoogleLogin
}
}

export default AuthLogic