import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const { userId } = useParams()

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
    </div>
  )
}

export default User