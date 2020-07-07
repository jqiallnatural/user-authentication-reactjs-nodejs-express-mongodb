import React from 'react'
import {Link} from "react-router-dom"
import AuthOptions from "../components/auth/AuthOptions"

const divStyle = {
  backgroundColor: 'grey',
  display: "flex",
}

export default function Header() {
  return (
    <div style={divStyle}>
      <Link to ="/">Home page</Link>
      <AuthOptions />
    </div>
  )
}