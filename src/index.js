import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App'

const el = document.createElement('div')
document.getElementsByTagName('body')[0].appendChild(el)

const root = createRoot(el)

root.render(<App />)