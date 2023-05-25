import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout, Home, Blog, Login, CreateBlog} from "./Components";
import {useEffect} from "react";
import {axiosConfig} from "./config";
import Cookies from "js-cookie"


function App() {

  useEffect(()=>{
    const currentPath = window.location.pathname;
    if(Cookies.get('token') !== undefined || Cookies.get('token') !== 'undefined') {
      axiosConfig.get("http://localhost:3030/auth/check",{
        headers:{
          token: Cookies.get('token')
        }
      }).then((res) => {
        console.log(res.data)
        if (!res.data) {
          if (currentPath !== '/login' && currentPath !== '/signup') {
            window.location.href = '/login';
          }
        } else {
          if (currentPath === '/login' || currentPath === '/signup') {
            window.location.href = '/';
          }
        }
      }).catch((error)=>{
        if (currentPath !== '/login' && currentPath !== '/signup') {
          window.location.href = '/login';
        }
      })
    }else{
      if (currentPath !== '/login' && currentPath !== '/signup') {
        window.location.href = '/login';
      }
    }
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path={"all-blogs"} element={(<div>hi</div>)}/>
            <Route path={"blog/:id"} element={<Blog/>}/>
            <Route path={"createblog"} element={<CreateBlog/>}/>
          </Route>
          <Route path={"/login"} element={<Login/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
