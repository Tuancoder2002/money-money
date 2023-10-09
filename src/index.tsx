import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Redux Provider
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from './App';
import { store } from './redux/store'; // Import Redux store
import reportWebVitals from './reportWebVitals';

Kommunicate.init("295d4c607bf36984062c6f3d0ab83eaaa", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Bao bọc ứng dụng trong Redux Provider */}
      <BrowserRouter >
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
