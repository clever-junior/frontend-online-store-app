import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Root from "./Root"

function AppLayout() {
  return (
    <>
      <Header />
      <Root />
      <Outlet />
    </>
  )
}

export default AppLayout