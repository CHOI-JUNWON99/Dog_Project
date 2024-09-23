import React from 'react';
import '../css/Navbar.css';
import { LuDog } from "react-icons/lu"; // 강아지 아이콘

function Navbar() {
  return (
    <div className='navbar'>
      <h1>강아지 간식 사전</h1>
      <button className='navbar--button'><LuDog className='dog_icon'/></button>
    </div>
  );
}

export default Navbar;
