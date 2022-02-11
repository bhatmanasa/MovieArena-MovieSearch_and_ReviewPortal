import React, { useState } from 'react';
import NavLeft from './NavRoutes/NavLeft';
import NavRight from './NavRoutes/NavRight';
import { Drawer, Button} from 'antd';
import Icon from '@ant-design/icons';
import './NavRoutes/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">MOVIE ARENA</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <NavLeft mode="horizontal" />
        </div>
        <div className="menu_right">
          <NavRight mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >MENU
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="MENU"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <NavLeft mode="inline" />
          <NavRight mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar