import "./home.css"; 

import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [profile, setProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function getProfile() {
    try {
      const res = await axios.get("http://localhost:5000/auth/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status > 300) throw new Error("failed");
      console.log(res.data);
      setProfile(res.data.user);
      setIsModalOpen(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="home-container">
      <h1>Welcome {profile.name}</h1>
      <h4>You can get your profile details by clicking get profile button</h4>
      <button onClick={getProfile} className="logout-btn">Get Profile Details</button>
      <Modal isOpen={isModalOpen} className="modal-container">
        <h1 className="modal-title">User Details</h1>
        <div className="user-details">
          <h3>Name: {profile?.name}</h3>
          <h3>Email: {profile?.email}</h3>
          <h3>Contact Number: {profile?.mobileNumber}</h3>
        </div>
        <button className="close-btn" onClick={() => {
          setIsModalOpen(false);
        }}>
          Close
        </button>
      </Modal>
      <div>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          navigate('/');
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}
