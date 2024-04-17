import React from "react";

import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import theme from "../theme/themeConfig";

import { store } from "../reducers/store";
import { Provider } from "react-redux";
import Layout from "./layout";

const toastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
};

const App = ({ Component, pageProps }) => {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <ToastContainer {...toastOptions} />

          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
