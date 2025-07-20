import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarCompo from "../components/NavbarCompo";
import Footer from "../components/Footer";
import "../App.css";
import { BookSto } from "../Context";
import axios from "axios";

export default function WebWrapper() {
  const loca = "http://localhost:5000";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddresses, setDefaultAddresses] = useState();

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserDetails(null);
    navigate("/login");
  };
  const saveCredentials = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userDetails", JSON.stringify(data.user));
    setToken(data.token);
    setUserDetails(data.user);
    fetchUserAddress(data.token);
    navigate("/");
  };

  const fetchUserAddress = (token) => {
    axios
      .get(`${loca}/address/fetch`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAddresses(res.data);
        const da = res.data.find((adrs)=> adrs.isDefault === true);
        console.log(da);
        
        setDefaultAddresses(da)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authenticate = () => {
    let token = localStorage.getItem("token");
    let ud = localStorage.getItem("userDetails");
    if (token) {
      setToken(token);
      setUserDetails(JSON.parse(ud));
      fetchUserAddress(token);
    }
    setLoading(false);
  };
  useEffect(() => {
    authenticate();
  }, []);
  if (!loading) {
    return (
      <>
        <BookSto.Provider
          value={{
            token,
            userDetails,
            setUserDetails,
            logout,
            saveCredentials,
            loca,
            addresses,
            fetchUserAddress,
            defaultAddresses
          }}
        >
          <NavbarCompo />
          <Outlet />
          <Footer />
        </BookSto.Provider>
      </>
    );
  }
}
