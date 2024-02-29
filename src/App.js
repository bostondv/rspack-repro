import React, { lazy, Suspense, useState } from 'react'

const Page = lazy(() => import('./Page'))

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello, World</h1>

      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      
      <Suspense>
        <Page />
      </Suspense>
    </>
  )
}