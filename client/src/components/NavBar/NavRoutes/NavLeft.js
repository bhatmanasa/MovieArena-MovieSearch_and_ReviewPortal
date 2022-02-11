import React from 'react';
import { Menu } from 'antd';
				
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function NavLeft(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/" style={{color:'rgb(255, 203, 5)'}}>HOME</a>
    </Menu.Item>
    {//explore movies
    }
    <Menu.Item key="find">
      <a href="/search" style={{color:'rgb(255, 203, 5)', backgroundColor:'black'}}>EXPLORE MOVIES <span>🧐</span></a>
    </Menu.Item> 
    <Menu.Item key="contact">
      <a href="/contact" style={{color:'rgb(255, 203, 5)', backgroundColor:'black'}}>CONTACT US</a>
    </Menu.Item> 
  </Menu>
  )
}

export default NavLeft