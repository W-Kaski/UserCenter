import { Footer } from '@/components';
import { FORGET_PASSWORD, SYSTEM_LOGO } from '@/constants';

import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';

import {login} from '@/services/ant-design-pro/api';

import { Helmet, history, Link, useModel } from '@umijs/max';
import { Alert, Divider, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

// const Lang = () => {
//   const { styles } = useStyles();
//   return;
// };
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({
        ...values,
        type,
      });
      if (user) {
        const defaultLoginSuccessMessage = 'login success！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        history.push('/');
        return;
      }
      console.log(user);
      setUserLoginState(user);

    } catch (error) {
      const defaultLoginFailureMessage = 'login failed！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'login'}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>
      {/*<Lang />*/}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >


        <LoginForm
          // change the name of the button
          submitter={{
            searchConfig: {
              submitText: 'Login',
            },
          }}

          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src= {SYSTEM_LOGO}/>}
          title="User Management System"
          subTitle={'- A Open Source Project'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account Login',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'Wrong userAccount or Password'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter your user account'}
                rules={[
                  {
                    required: true,
                    message: 'user account required！',
                  },
                  {
                    min: 5,
                    max: 19,
                    type: 'string',
                    message: 'At least 5 characters long, at most 19 characters long！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter your password'}
                rules={[
                  {
                    required: true,
                    message: 'Password required！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'At least 8 characters long！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              AutoLogin
            </ProFormCheckbox>
            <Divider type="horizontal" />
            <Link to= "/user/register">New account?</Link>
            <a
              style={{
                float: 'right',
              }}
              href={FORGET_PASSWORD}
              target="_blank"
              rel="noreferrer"
            >
              forget password ?
            </a>

          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
