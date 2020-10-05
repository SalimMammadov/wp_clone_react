import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import "./Login.css"
import { connect } from "react-redux";
import {gir} from './redux/action'

 function Login({user,gir}) {

    const signIn = ()=>{
            auth.signInWithPopup(provider).then((r)=>gir(r.user))
            .catch(err=>{alert(err.message)})
    }
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />
                <div className="login__text">
                    <h1>Whatsapp Login</h1>
                </div>
                <Button onClick={signIn}>Google ilə giriş</Button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      user: state.reducer,
    };
  }

  const mapDispatchToProps = {
    gir,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);

  
