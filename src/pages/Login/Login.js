import React, { Component } from 'react';
import { Input, Button } from 'antd';

import {getAuthority,setAuthority} from '../../utils/authority';


const Wallet = require('ethereumjs-wallet');
const EtheruemUtils = require('ethereumjs-util');

class Login extends Component {

    state = {
        keyPlaceHolder: "enter your existing private key here.",
        generateNewPrivateKey: false,
        privateKey: '',
        loading: false,
    };

    constructor(props) {
        super(props);
        // console.log("Props are: ", props);
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


    onClickLogin = () => {
        let validity = EtheruemUtils.isValidPrivate((Buffer.from(this.state.privateKey, 'utf8')))
        console.log("Check key: ", this.state.privateKey);
        console.log("Valid PK? ", validity);

        this.setState({
            loading: validity
        })
        window.location = window.location.origin + '/certificates/allcertificateslist';
    }

    render() { 
        console.log("Authority is: ", getAuthority());
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
                    <Button type="primary" loading={this.state.loading} onClick={this.onClickLogin}>
                    Login
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default Login;