import React from 'react';
import { Routes, Route } from "react-router-dom";

import Homepage from './components/Homepage';
import Discovery from './pages/Discovery';
import Restaurants from './pages/Restaurant';
import Profile from './pages/Profile';
import Stores from './pages/Store';
import Mamajollof from './pages/Mamajollof';
import Pizzahub from './pages/Pizzahub';
import Burgerpalace from './pages/Burgerpalace';
import Sweettooth from './pages/Sweettooth';
import Veganspot from './pages/Veganspot';
import Tacofiesta from './pages/Tacofiesta';
import Freshmart from './pages/Freshmart';
import Bottlestop from './pages/Bottlestop';
import Phamarcy from './pages/Phamarcy';
import Jewery from './pages/Jewery';
import Shawarmaking from './pages/Shawarmaking';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Tracking from './pages/Tracking';
import Orderdelivered from './pages/Orderdelivered';
import Notification from './pages/Notification';
import AdminAnalytics from './pages/AdminAnalytics';
import Admindashboard from './pages/Admindashboard';
import Adminindex from './pages/Adminindex';
import Adminorder from './pages/Adminorder';
import Adminpayment from './pages/Adminpayment';
import Adminmenulist from './pages/Adminmenulist';
import Adminreviews from './pages/Adminreviews';
import Adminsetting from './pages/Adminsetting';
import Adminnotification from './pages/Adminnotification';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/mamajollof" element={<Mamajollof />} />
      <Route path="/pizzahub" element={<Pizzahub />} />
      <Route path="/burgerpalace" element={<Burgerpalace />} />
      <Route path="/sweettooth" element={<Sweettooth />} />
      <Route path="/veganspot" element={<Veganspot />} />
      <Route path="/tacofiesta" element={<Tacofiesta />} />
      <Route path="/freshmart" element={<Freshmart />} />
      <Route path="/bottlestop" element={<Bottlestop />} />
      <Route path="/phamarcy" element={<Phamarcy />} />
      <Route path="/jewery" element={<Jewery />} />
      <Route path="/shawarmaking" element={<Shawarmaking />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/orderdelivered" element={<Orderdelivered />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/adminAnalytics" element={<AdminAnalytics />} />
      <Route path="/admindashboard" element={<Admindashboard />} />
      <Route path="/adminindex" element={<Adminindex />} />
      <Route path="/adminorder" element={<Adminorder />} />
      <Route path="/adminpayment" element={<Adminpayment />} />
      <Route path="/adminmenulist" element={<Adminmenulist />} />
      <Route path="/adminreviews" element={<Adminreviews />} />
      <Route path="/adminsetting" element={<Adminsetting />} />
      <Route path="/adminnotification" element={<Adminnotification />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Forgotpassword" element={<Forgotpassword />} />
    </Routes>
  );
}

export default App;
