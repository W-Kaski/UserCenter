import { Footer } from '@/components';
import { SYSTEM_LOGO } from '@/constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

import { register } from '@/services/ant-design-pro/api';

import { Helmet, history } from '@umijs/max';
import { Divider, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import { Link } from '@@/exports';

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

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const { styles } = useStyles();

  const handleSubmit = async (values: API.RegisterParams) => {
    const { password, checkPassword } = values;

    if (password !== checkPassword) {
      message.error('Password and confirm password do not match！');
      return;
    }

    try {
      const id = await register({
        ...values,
        type,
      });

      if (id) {
        const defaultLoginSuccessMessage = 'register success！';
        message.success(defaultLoginSuccessMessage);

        const urlParams = new URL(window.location.href).searchParams;
        history.push('/user/login', urlParams.get('redirect'));
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'register failed！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

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
              submitText: 'Register',
            },
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="User Management System"
          subTitle={'- A Open Source Project'}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account UserManagement',
              },
            ]}
          />

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
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter confirm password '}
                rules={[
                  {
                    required: true,
                    message: 'confirm password required！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'At least 8 characters long！',
                  },
                ]}
              />
              <ProFormText
                name="identityCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter your identity code'}
                rules={[
                  {
                    required: true,
                    message: 'identify code required！',
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
            <Divider type="horizontal" />
            <Link to="/user/login">Have account?</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
