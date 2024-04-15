import "@/styles/globals.css";
import Navbar from "../styles/components/navbar";
import Footer from "../styles/components/footer";
import store from "../styles/redux/store";
import React from "react"
import { Provider } from "react-redux";




export default function App({ Component, pageProps }) {
  
  return (
    <React.StrictMode>
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
    </React.StrictMode>
  );
}

