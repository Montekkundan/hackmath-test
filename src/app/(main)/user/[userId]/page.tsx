"use client";
import { useUser } from '@clerk/nextjs';
import React from 'react'

function User() {
const { user } = useUser();
  return (
    <div>
        Hello {user?.fullName}
        {user?.emailAddresses.map((email) => (
          <div key={email.id}>
            {email.emailAddress}
          </div>
        ))}
    </div>
  )
}

export default User