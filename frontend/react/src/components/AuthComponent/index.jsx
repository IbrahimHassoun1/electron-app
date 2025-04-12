import React from 'react'
import "./styles.css";
import useAuthLogic from './useAuthLogic';

const AuthComponent = () => {
  const {  registerOrLogin,
    step,
    data, 
    login,
    submit,
    handleGoogleLogin,
    back,handleChange,switchRegLog} = useAuthLogic()
  return (
    <div className="container">
      <div className="login-box">
        <div className="left">
          <button onClick={handleGoogleLogin}>Google</button>
        </div>
        <div className="right">
          <div className="right-content">

            <div className="numbers">
              <div className={`number ${step==1?'selected-number':''}`} >1</div>Details<div className={`number ${step==2?'selected-number':''}`} >2</div>Address<div className={`number ${step==3?'selected-number':''}`} >3</div>Signup
            </div>
            <hr />
              <h3>Step {step}/3</h3>
              <h2>Details</h2>
              {
                registerOrLogin=="register"?
                step===1?
                <form onSubmit={submit}>
                <label htmlFor="first_name"> First Name<input value={data.first_name} type="text" placeholder="John" name="first_name" id="first_name" onChange={(e)=>handleChange(e)}required/></label>
               
                <label htmlFor="last_name"> Last Name<input value={data.last_name} type="text" placeholder="Doe" name="last_name" id="last_name" onChange={(e)=>handleChange(e)} required/></label>
                <label htmlFor="place_of_birth"> Place of birth<input value={data.place_of_birth} type="text" placeholder="New York" name="place_of_birth" id="place_of_birth" onChange={(e)=>handleChange(e)} required/></label>
                <label htmlFor="date_of_birth"> Date of birth
  <input value={data.date_of_birth} type="date" placeholder="1-1-1999" name="date_of_birth" id="date_of_birth" onChange={(e)=>handleChange(e)} required/>
</label>
                
                <div className="buttons"><button type="submit" >Next</button></div>
              </form>:
              step===2?
              <form onSubmit={submit}>
              <label htmlFor="first_name"> Street 1<input value={data.street} type="text" placeholder="John" name="street" id="first_name" onChange={(e)=>handleChange(e)}required/></label>
              <label htmlFor="city"> City<input value={data.city} type="text" placeholder="New York" name="city" id="city" onChange={(e)=>handleChange(e)} required/></label>
              <label htmlFor="country" > Country<input value={data.country} type="text" placeholder="USA" name="country" id="country" onChange={(e)=>handleChange(e)} required/></label>
              
              <div className="buttons">
              
              <div className="buttons">
              <button className="back-button" onClick={(e)=>back(e)}>Back</button>
              <button type="submit" >Next</button>
              </div>
              </div>
              
            </form>
              :
              <form onSubmit={submit}>
              <label htmlFor="email"> Email<input value={data.email} type="email" placeholder="example@email.com" name="email" id="email" onChange={(e)=>handleChange(e)}required/></label>
             
              <label htmlFor="password"> Password<input value={data.password} type="password" placeholder="*******" name="password" id="password" onChange={(e)=>handleChange(e)} required/></label>
              <label htmlFor="password_confirmation"> Password Confirmation<input value={data.password_confirmation} type="password" placeholder="*******" name="password_confirmation" id="password_confirmation" onChange={(e)=>handleChange(e)} required/></label>
             
              <div className="buttons">
              <button className="back-button" onClick={(e)=>back(e)}>Back</button>
              <button type="submit" >Signup</button>
              </div>
            </form>
              :<form onSubmit={login}>
              <label htmlFor="email"> Email<input value={data.email} type="email" placeholder="example@email.com" name="email" id="email" onChange={(e)=>handleChange(e)}required/></label>
             
              <label htmlFor="password"> Password<input value={data.password} type="password" placeholder="*******" name="password" id="password" onChange={(e)=>handleChange(e)} required/></label>
             
              <div className="buttons">
              <button className="back-button" onClick={(e)=>back(e)}>Back</button>
              <button type="submit" >Signup</button>
              </div>
            </form>
              }
              
          
          {registerOrLogin=='register'?<p>Already have account? <span onClick={()=>switchRegLog()}>Login</span></p>:<p>Don't have an account? <span onClick={()=>switchRegLog()}>Signup</span></p>}
          </div>
        </div>
      

      </div>
    </div>
  );
};

export default AuthComponent;