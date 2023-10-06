
import React from "react"
export const onRenderBody = ({ setPostBodyComponents }) => {
    setPostBodyComponents([
      <div id="portal" className="portal" />
    ])
  }