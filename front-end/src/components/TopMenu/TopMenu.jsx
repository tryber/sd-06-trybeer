import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from './styles';

export default function TopMenu({ pageTitle }) {
  const classes = styles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={ classes.root }>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={ clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon data-testid="top-hamburguer" />
          </IconButton>
          <Typography
            data-testid="top-title"
            variant="h5"
            noWrap
          >
            { pageTitle }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div>
          <IconButton onClick={ handleDrawerClose }>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Divider />
          <List>
            <ListItem
              button
              data-testid="side-menu-item-products"
              onClick={ () => history.push('/products') }
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              Produtos
            </ListItem>
            <ListItem
              button
              data-testid="side-menu-item-my-orders"
              onClick={ () => history.push('/orders') }
            >
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              Meus Pedidos
            </ListItem>
            <ListItem
              button
              data-testid="side-menu-item-my-profile"
              onClick={ () => history.push('/profile') }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Meu Perfil
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              data-testid="side-menu-item-logout"
              onClick={ () => history.push('/login') }
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              Sair
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

TopMenu.propTypes = {
  pageTitle: propTypes.string.isRequired,
};
