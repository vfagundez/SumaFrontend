import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Hidden } from '@material-ui/core';
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const useStyles = makeStyles((theme) =>({
  navBottom: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    position: 'fixed',
    bottom: theme.spacing(0),
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  var pathname = window.location.pathname;
  pathname = pathname.slice(1);
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    window.location.href='/'+newValue;
  };

  return (
    <Hidden mdUp>
    <BottomNavigation value={value} onChange={handleChange} className={classes.navBottom}>
      <BottomNavigationAction label="Panel Incio" value="" icon={<DashboardIcon />} />
      <BottomNavigationAction label="Movimientos" value="movimientos" icon={<CompareArrowsIcon  />} />
      <BottomNavigationAction label="Cuentas" value="cuentas" icon={<AccountBalanceWalletIcon  />}  />
    </BottomNavigation>
    </Hidden>
  );
}