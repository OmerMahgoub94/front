import React from 'react';
// import { Toolbar, ToolbarGroup, } from 'material-ui/Toolbar';
import { Link } from 'react-router'
import * as MUI from 'material-ui';
import './App.css';
import './Slider.css';
import './footer.css';
import Slider from 'react-image-slider';
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



const images = [

  './images/hero1.jpg',
  './images/ThingsToDo.jpg',
  './images/6.jpg',
  './images/7.jpg',
  './images/front3.jpg',
  './images/8.jpg',
  './images/Summer.jpg',

];

const styles = {
  headline: {
    fontSize: 10,
    padding: 5

  },

  logout: {
    fontSize: 6,
    padding: "auto"
  }
};

export default class Menu extends React.Component {


  handleLoggedInConsumerStaff = () => {
    console.log("handleLoggedInConsumer with user: ", sessionStorage.getItem("userName"));

    if (sessionStorage.getItem("userName")) {

      var usernamee = sessionStorage.getItem("userName");
      var index = usernamee.indexOf("@");
      console.log("Index is ", index)
      var username = usernamee.substring(index + 1, usernamee.length);
      sessionStorage.setItem("username", usernamee.substring(0, index));
      console.log(username);

      if (username == "staff.com") {
        return 1;
      } else if (username == "test.com") {
        return 2;
      }

    } else {
      return 3;
    }
  }

  render() {
    return (
      <div>
        {console.log("Who's Logged In? ",this.handleLoggedInConsumerStaff())}
        <MUI.Card className="card" >

          <div className="logo">
            <img alt="description" className="logotitle" src={require('./images/logooo.fw.png')} className="logopic" />
          </div>

          <Slider images={images} isInfinite delay={5000}>
            {images.map((image, key) => <div key={key}><img src={require(image)} alt="something" width='600%' height='200px;' /></div>)}
          </Slider>

        </MUI.Card>

        <Tabs tabType={'scrollable-buttons'}>
          <Tab style={styles.headline} containerElement={<Link to="/" />} value="pane-1" label="HOME"></Tab>
          {
            this.handleLoggedInConsumerStaff() == 3 &&
            <Tab style={styles.headline} containerElement={<Link to="/Register" />} value="pane-2" label="Account"></Tab>
          }

          {
            this.handleLoggedInConsumerStaff() == 2 &&
            <Tab style={styles.headline} containerElement={<Link to="/Service" />} value="pane-1" label="Service"></Tab>
          }
          {
            this.handleLoggedInConsumerStaff() == 2 &&
            <Tab style={styles.headline} containerElement={<Link to="/Ticket" />} value="pane-2" label="Report"></Tab>
          }

          {
            this.handleLoggedInConsumerStaff() == 2 &&
            <Tab style={styles.headline} containerElement={<Link to="/Bill" />} value="pane-2" label="Bill"></Tab>
          }

          {
            this.handleLoggedInConsumerStaff() == 2 &&
            <Tab style={styles.headline} containerElement={<Link to="/MyProperties" />} value="pane-2" label="Properties"></Tab>
          }        

          {
            this.handleLoggedInConsumerStaff() == 2 &&
            <Tab style={styles.logout} containerElement={<Link to="/Logout" />} value="pane-2" label={sessionStorage.getItem("username") + " | Logout"}></Tab>
          }
          {
            this.handleLoggedInConsumerStaff() == 1 &&
            <Tab style={styles.headline} containerElement={<Link to="/Requests" />} value="pane-2" label="Requests"></Tab>
          }
          {
            this.handleLoggedInConsumerStaff() == 1 &&
            <Tab style={styles.headline} containerElement={<Link to="/Logout" />} value="pane-2" label={sessionStorage.getItem("username") + "| Logout"}>></Tab>
          }

          
          <Badge className="notifIcon"
            badgeContent={1}
            primary={true}
          >
            <NotificationsIcon />
          </Badge>


        </Tabs>
        <br/>
        {/*<Tabs> <Tab label={sessionStorage.getItem("userName")}>  </Tab> <Tab style={styles.headline} containerElement={<Link to="/Logout" />} value="pane-2" label="Logout"></Tab></Tabs>*/}


        <br />
        <hr />
        {this.props.children}
        <br />
        <br />
        <hr />

        <MUI.Card>
          <footer>
            <div className="footer-content-wrapper">
              <div className="footer-col large-25 small-50 tiny-100 ta-l flt">
                <h3 className="footerTitle">Company Info</h3>
                <a href="#">Careers</a>
                <a href="#">About</a>
                <a href="#">Mobile</a>
                +974-444 555 210
              </div              >

              <div className="footer-col large-25 small-50 tiny-100 ta-l flt">
                <h3 className="footerTitle">Contact Us</h3>
                <a href="#">Help Line</a>
                <a href="#">Location</a>
                <a href="#">Email IPC@CodeBusters.com</a>
              </div>

              <div className="footer-col large-25 small-50 tiny-100 ta-l flt">
                <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="200" height="150"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165300.47012097907!2d-54.299834213430394!3d49.6576936568813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b762ade72e6c505%3A0xa25a36acdc07f76c!2sFogo+Island!5e0!3m2!1sen!2s!4v1496314572186">
                </iframe>
              </div>
            </div>
            <div className="clearfix"></div>
          </footer>


        </MUI.Card>
      </div>

    );
  }
}