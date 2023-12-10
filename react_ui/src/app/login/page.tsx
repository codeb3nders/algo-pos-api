'use client';

import { getAllUsers, loginUser } from '@/apis/user.api';
import Button from '@/components/elements/Button';
import TextBox from '@/components/elements/TexBox';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';

import React, { useRef } from 'react';

const LoginPage = () => {
  const userName = useRef('1234');
  const pass = useRef('');

  const router = useRouter();

  const login = async () => {
    const data = {
      email: 'coffee-algo-admin@gmail.com',
      password: 'password',
    };
    try {
      console.log('LOGGING IN');
      await loginUser(data.email, data.password);
      console.log('REDIRECTING');
      router.push('/dashboard');
    } catch (error) {}
  };

  const handleSubmit = async () => {
    console.log('handle submit');
    const response = await getAllUsers();
    console.log({ response });
  };

  return (
    <div className="">
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          id="username"
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <TextBox
          id="password"
          labelText="Password"
          type={'password'}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
