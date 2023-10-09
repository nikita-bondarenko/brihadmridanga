import "./src/styles/global.css"
import Layout from "./src/components/layout/Layout.tsx"
import React from "react"


export const wrapPageElement = ({ element }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <Layout>{element}</Layout>
}
