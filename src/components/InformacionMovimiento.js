import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import {
  Hidden,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  GridList
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized-auto-sizer";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  navBottom: {
    width: "100%",
    position: "absolute",
    bottom: theme.spacing(0)
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing()
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor:'red',
    height: "100vh",
    overflow: "auto",
    marginLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    flexGrow: 1,
    marginLeft: 0
  },
  fixedHeight: {
    height: 240
  },
}));



export default function InformacionCuentas(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <main className={props.open ? classes.content : classes.contentShift}>
        <Hidden smDown>
        <div className={classes.appBarSpacer} />
      </Hidden>
      <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            hola
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            hola
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            hola
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </main>
  );
}


