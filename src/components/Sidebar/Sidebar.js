import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
// import Button from '../Button/Button';

import './Sidebar.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: 'var(--c-gray-dark)',
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: 'var(--c-gray-dark)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'var(--c-gray-dark)',
    color: 'var(--c-white)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: 'var(--c-gray-light)'
  },
  iconSelected: {
    color: 'var(--c-accent)'
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  buildLinks = () => {
    if (!this.props.club.current) { return []; }
    
    return [
      { label: 'Home', route: `/clubs/${this.props.club.current._id}` },
      { label: 'Tournaments', route: `/clubs/${this.props.club.current._id}/tournaments` },
      { label: 'Members', route: `/clubs/${this.props.club.current._id}/members` },
      { label: 'Account', route: `/clubs/${this.props.club.current._id}/account` },
    ];
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleNavigation = (route) => {
    this.props.history.push(route);
    if (this.state.mobileOpen) {
      this.handleDrawerToggle();
    }
  }

  render() {
    const { classes, theme, children, app } = this.props;
    const links = this.buildLinks();

    const drawer = (
      <div className="display-flex flex-direction-column fullheight">
        <div className={classes.toolbar}>
          <div className="Sidebar__app-logo sidebar-appname-wrapper">
            <div className="display-flex flex-center-center fullheight">
              <h2>HomePokerClub</h2>
            </div>
          </div>
        </div>
        <Divider />
        
        <div className="display-flex flex-center-center">
        <Avatar size='superLarge' color='green'>C</Avatar>
        </div>
        <List>
          {links.map((link) => (
            <ListItem selected={link.label === app.currentPageHeader} className='link-row' button key={link.label} onClick={() => this.handleNavigation(link.route)}>
              
              {link.label === app.currentPageHeader 
                ? <ListItemIcon>{<InboxIcon className={classes.iconSelected} />}</ListItemIcon>
                : <ListItemIcon>{<InboxIcon className={classes.icon} />}</ListItemIcon>
              }
              <ListItemText className="sidebar-link-text" primary={link.label} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <div className="space-left space-right wide-space-below flex-1 display-flex flex-align-end">
          {/* Commented out until multiple clubs are an active feature */}
          {/* <Button fullwidth>Change club</Button> */}
        </div>
        
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {app.currentPageHeader}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Home /> */}
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps({ app, club }) {
  return { app, club };
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, null)(ResponsiveDrawer)));

// export default withNotifications(withRouter(connect(mapStateToProps, { ...userActions, ...appActions })(Account)));
