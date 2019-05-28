import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import UserInfo from './UserInfo';
import * as firebase from 'firebase';
import * as blockstack from 'blockstack';
import { Redirect } from 'dva/router';


const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  submitBlockStackLogin: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: false,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      console.log("Dispatch: ", dispatch);
      console.log("Values: ", values);
      // UserInfo.setUserData(values.userName, '');
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });

      var userId = blockstack.auth().currentUser.uid;
      // console.log('userID ', userId);
      this.setState({ userId: userId });

      let that = this;
      blockstack
        .database()
        .ref('/users/' + userId)
        .once('value')
        .then(function(snapshot) {
          // console.log('User record found! ', snapshot );
          if (snapshot.key) {
            if(snapshot.val()) {
              const { name, email, profile_picture, cryptoPublicAddress } = snapshot.val();
              UserInfo.setUserData(name, email, profile_picture, cryptoPublicAddress);
              UserInfo.setSecret(values.password);
              // that.setAvatarURL(profile_picture);
            }
          } else {
            console.log("User record doesn't exist");
          }
        }
        )
        .catch(error => console.log('rejected ', error));
    }
    else
    {
      console.log('Login error ', err);
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  onClickBlockStackSignIn = () => {
     blockstack.redirectToSignInWithAuthRequest();
  }

  componentDidMount = () =>
  {
    if(blockstack.isUserSignedIn())
    {
      window.location = window.location.origin + "//dashboard";
    }
    else
    {
      console.log("Please sign in.");
    }
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    console.log("Sign in status: ", blockstack.isUserSignedIn());

    if(blockstack.isSignInPending())
    {
        console.log("Sign in request in progress.");
        blockstack.handlePendingSignIn().then(() => {
          console.log("Data", blockstack.loadUserData());
          this.props.history.push("/dashboard");
        });
    }
    else{

    }

    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          {/*<Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>*/}
          {/*{login.status === 'error' &&*/}
          {/*login.type === 'mobile' &&*/}
          {/*!submitting &&*/}
          {/*this.renderMessage(*/}
          {/*formatMessage({ id: 'app.login.message-invalid-verification-code' })*/}
          {/*)}*/}
          {/*<Mobile*/}
          {/*name="mobile"*/}
          {/*placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}*/}
          {/*rules={[*/}
          {/*{*/}
          {/*required: true,*/}
          {/*message: formatMessage({ id: 'validation.phone-number.required' }),*/}
          {/*},*/}
          {/*{*/}
          {/*pattern: /^1\d{10}$/,*/}
          {/*message: formatMessage({ id: 'validation.phone-number.wrong-format' }),*/}
          {/*},*/}
          {/*]}*/}
          {/*/>*/}
          {/*<Captcha*/}
          {/*name="captcha"*/}
          {/*placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}*/}
          {/*countDown={120}*/}
          {/*onGetCaptcha={this.onGetCaptcha}*/}
          {/*getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}*/}
          {/*getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}*/}
          {/*rules={[*/}
          {/*{*/}
          {/*required: true,*/}
          {/*message: formatMessage({ id: 'validation.verification-code.required' }),*/}
          {/*},*/}
          {/*]}*/}
          {/*/>*/}
          {/*</Tab>*/}
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div> */}
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <Button onClick = {this.onClickBlockStackSignIn}>
            {/* <FormattedMessage id="app.login.loginWithBlockStack" /> */}
            Sign-in with Blockstack
          </Button>
          <div className={styles.other}>
            {/*<FormattedMessage id="app.login.sign-in-with" />*/}
            {/*<Icon type="alipay-circle" className={styles.icon} theme="outlined" />*/}
            {/*<Icon type="taobao-circle" className={styles.icon} theme="outlined" />*/}
            {/*<Icon type="weibo-circle" className={styles.icon} theme="outlined" />*/}
           
           
           {/* sign up button hidden */}
            {/* <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link> */}
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
