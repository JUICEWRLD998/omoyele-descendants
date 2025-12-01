"use client"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth"
import { auth } from "./config"

// Sign up with email and password
export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  
  // Update the display name
  await updateProfile(userCredential.user, {
    displayName: `${firstName} ${lastName}`,
  })

  return userCredential.user
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// Sign out
export async function signOut() {
  await firebaseSignOut(auth)
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser
}

// Subscribe to auth state changes
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

// Get ID token for API calls
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser
  if (!user) return null
  return user.getIdToken()
}
