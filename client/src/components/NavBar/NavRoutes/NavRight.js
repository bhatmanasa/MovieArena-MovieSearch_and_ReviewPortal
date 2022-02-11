/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import Authorize from '../../Navbar2/Navbar';
function NavRight(props) {
  const user = useSelector(state => state.user)
  const mode = props.mode;


    return (
      <div className="drawer-sign">
      <Authorize mode={mode} />
    </div>
    )
 
  }


export default withRouter(NavRight);

