import React, { useState } from 'react'

export default function Page() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <br />
      <button onClick={() => setCount(count + 1)}>Lazy Count: {count}</button>
      <p>This is a lazy component</p>
    </div>
  )
}