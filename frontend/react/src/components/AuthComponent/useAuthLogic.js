import { useNavigate } from "react-router-dom";
import requestMethods from "../../utils/enums/request.methods.js"
import request from "../../utils/remote/axios.js";
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
        method:requestMethods.POST,
        route:"api/v0.1/login",
        body: {
          ...data
        }
      })
      if(response.success){
        localStorage.setItem('access_token',response.data.token);
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
        method:requestMethods.POST,
        route:"api/v0.1/register",
        body: {
          ...data
        }
      })
      if(response.success){
        localStorage.setItem('access_token',response.data.token)
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
 
  return {
    registerOrLogin,SetRegisterOrLogin,
    step,setStep,
    data, setData,
    login,
    submit,
    back,handleChange,switchRegLog
}
}

export default AuthLogic