import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';
import {getAuthority,setAuthority} from '../../utils/authority';
import AntLogin from '@/components/Login';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './Login.less';


const Wallet = require('ethereumjs-wallet');
const EtheruemUtils = require('ethereumjs-util');
const {Submit} = AntLogin;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  submitBlockStackLogin: loading.effects['login/login'],
}))

class Login extends Component {

    state = {
        keyPlaceHolder: "enter your existing private key here.",
        generateNewPrivateKey: false,
        privateKey: '',
        loading: false,
        type: 'account',
      };

    constructor(props) {
        super(props);
    }

    onInputPrivateKey = (value) => {
        if(event.target.value.length > 0)
        {
            console.log("PK :", event.target.value);
            this.setState({
                privateKey: event.target.value
            })
        }
        setAuthority('admin');
    }

    onClickGeneratePrivateKey = () => {
        const wallet = Wallet.generate();
        console.log("privateKey: " + wallet.getPrivateKeyString());
        console.log("address: " + wallet.getAddressString());
        
        this.setState({
            generateNewPrivateKey: true,
        })
    }

    handleSubmit = (err) => {
      const { type } = this.state;
      let values = {userName:"abc@gmail.com", password: "password"}
      if (!err) {
        console.log("Error occured.", err);
      }
      else
      {
        const { dispatch } = this.props;
        this.setState({
          loading: true
        });
        console.log("Handling dispatch.");
        // UserInfo.setUserData(values.userName, '');
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type:'account',
          },
        });
      }
    };
  

    onClickLogin = () => {
        let validity = EtheruemUtils.isValidPrivate((Buffer.from(this.state.privateKey, 'utf8')))
        let values = {userName:"abc@gmail.com", password: "password"}
        const {dispatch} = this.props;
        const {type} = this.state;

        console.log("Check key: ", this.state.privateKey);
        console.log("Valid PK? ", validity);

        this.setState({
            loading: true
        })
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
        });
      }

    render() { 
        // console.log("Authority is: ", getAuthority());
        const { login, submitting } = this.props;
        const { type, autoLogin } = this.state;

        return (
            <div className="example-input" style={{width: "100%", margin: "20px auto"}}>
                {
                    this.state.generateNewPrivateKey
                    ?
                    <div>
                        <h3 style={{textAlign: "center"}}>Enter your new private key here.</h3>
                        <div style={{width: "40%", margin: "auto"}}>
                        <Input size="large" onChange={this.onInputPrivateKey}/>
                        </div>
                    </div>
                    :
                    <div>
                        <h3 style={{textAlign: "center"}}>Already have a private key?</h3>
                        <div style={{width: "40%", margin: "auto"}}>
                        <Input size="large" placeholder={this.state.keyPlaceHolder} onChange={this.onInputPrivateKey}/>
                        <br />
                        <br />
                        <Button type="primary" icon="download" onClick = {this.onClickGeneratePrivateKey}>
                            Generate a private key.
                        </Button>
                        </div>
                    </div>
                }
                <div style={{width: "40%", margin: "auto"}}>
                    <br />
                      <Submit type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
                        Login
                      </Submit>
                </div>
            </div>
        );
    }
}
 
export default Login;


  // <Submit type="primary" loading={this.state.loading} onClick={this.handleSubmit}>
  // Login
  // </Submit>


// const { login, submitting } = this.props;
// const { type, autoLogin } = this.state;
// return (
//   <div className={styles.main}>
//     <Login
//       defaultActiveKey={type}
//       onTabChange={this.onTabChange}
//       onSubmit={this.handleSubmit}
//       ref={form => {
//         this.loginForm = form;
//       }}
//     >
//       <Submit loading={submitting}>
//         <FormattedMessage id="app.login.login" />
//       </Submit>
//       <Button onClick = {this.onClickBlockStackSignIn}>
//         Sign-in with Blockstack
//       </Button>
//       <div className={styles.other}>
//       </div>
//     </Login>
