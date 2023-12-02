'use client';

import Button from '@/components/elements/Button';
import TextBox from '@/components/elements/TexBox';
import axios from 'axios';

import React, { useRef } from 'react';

const LoginPage = () => {
  const userName = useRef('1234');
  const pass = useRef('');

  const onSubmit = async () => {
    console.log({ userName, pass });

    const res = await axios.post('http://127.0.0.1:3001/auth/login', {
      email: userName.current,
      password: pass.current,
    });

    console.log({ res });

    // const res = await fetch('http://127.0.0.1:3001/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include', // include, *same-origin, omit
    //   body: JSON.stringify({
    //     email: userName.current,
    //     password: pass.current,
    //   }),
    // });

    // console.log('RESPONSE', await res.json());

    // const result = await signIn('credentials', {
    //   username: userName.current,
    //   password: pass.current,
    //   redirect: true,
    //   callbackUrl: '/',
    // });
  };
  return (
    <div className="">
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          labelText="Password"
          type={'password'}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
