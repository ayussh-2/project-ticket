'use client'
//import { useEffect } from 'react';
//import { auth, database } from '../path-to-firebase-file/firebase';
import './signup.css'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import {
  signUpWithEmailAndPassword,
  signUpWithGitHub,
  signUpWithGoogle
} from '../../firebase/signupAuth'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password, name)
      router.push('/myticket')
    } catch (error) {
      console.error('Signup error:', error.message)
    }
  }
  const handleGoogleSignup = async () => {
    try {
      const user = await signUpWithGoogle()
      if (user) {
        router.push('/myticket')
      }
    } catch (error) {
      console.error('Signup failed:', error.message)
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className="signContainer">
      <div className="sign-form">
        <h1>User signup</h1>
        name:
        <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
        email:
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        password:
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="signupbutton" type="submit" onClick={handleSignUp}>
          Sign up
        </button>
        <button className="extsign" type="submit" onClick={handleGoogleSignup}>
          Sign up with Google
        </button>
        <button className="extsign" type="submit" onClick={signUpWithGitHub}>
          Sign up with Github
        </button>
      </div>
    </div>
  )
}

export default SignUp
