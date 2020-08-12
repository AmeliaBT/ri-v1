const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Header');
// react-bootstrap
const {Nav, Navbar, NavItem } = require('react-bootstrap');

/* the header component for navbar */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBtns: null,
     
      listLink: "",
      listLinkAll: "",
      listLinkAll2: "",
      chartLinkA:"",
       reportsLink: "", //defects
      exportData:"",
      securityLevel: ""
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  /***********************/
  // handlers
  /***********************/
  handleLogOut() {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/log-out', true);

      xhr.send();

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
          window.location.href = "/";
        }
      }
  }
  /***********************/
  componentDidMount() {
    // check if user is loged in
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/is-loged-in', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
       let response = JSON.parse(this.responseText);
         

        if(response.isLogedIn == true) {
            /* Show screen based on the Security level *********/   
          let securityLevel = response.securityLevel; 
       that.setState({
                 listLinkAll:  "/list-all",
                listLinkAll2: "/list-all2",
                chartLinkA: "/chartA",
                reportsLink: "/reports",
                 exportData: "/export",
               securityLevel: securityLevel
           });   
     switch (securityLevel) {
      case 1:
         // user     
          that.setState({
          ["navBtns"]: <Nav pullLeft  className="link span">                  
                      <NavItem className='span'> <div  onClick={that.handleLogOut} ><p  className="link">Log out </p></div> </NavItem>
                      <NavItem className='span' href='/signup3' ><p  className="link">Change PW </p> </NavItem>
                      </Nav>
           });
        break;
      case 2:
         // Manager
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span' href='/homepage'><p  className="link"> {response.inspname}'s RI Form</p></NavItem> 
                         <NavItem className='span' href='/list'><p  className="link">Edit Report </p> </NavItem> 
                       <NavItem className='span' href='/signup2' ><p  className="link">Add User</p></NavItem> 
                       <NavItem className='span' href='/signup3' ><p  className="link">Change PW </p></NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>
           });
         
       
        break;
      case 3:   
         //top level Admin
        
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span' href='/homepage' className="link"><p  className="link"> {response.inspname}'s RI Form </p></NavItem> 
                       <NavItem className='span' href='/list' > <p  className="link">Edit Report </p> </NavItem> 
                       <NavItem className='span' href='/up-many-records' ><p  className="link">Admin </p> </NavItem> 
                       <NavItem className='span' href='/export' ><p  className="link">Export </p> </NavItem> 
                       <NavItem className='span' href='/signup2'><p  className="link">Add User</p> </NavItem> 
                      <NavItem className='span' href='/signup3' ><p  className="link">Change PW </p> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>
           });
        break;
 default:
         // visitor
        
        that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
              
                        <NavItem className='span'>
                          <Link to='/login' className="link"><p  className="link"> Log in </p></Link>
                        </NavItem>
                      </Nav>
           });   
     
    }         
 /********************/       
        }
        else {
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">             
                        <NavItem className='span'>
                          <Link to='/login' className="link"><p  className="link"> Log in </p></Link>
                        </NavItem>
                      </Nav>
            
            
           });
         }
        }
  }

  /***********************/
 
  render() {
    return (
      <div  >
       <Navbar >
        <Navbar.Header>                          
        <Link to={this.state.listLinkAll} > <Navbar.Brand >  KPIs </Navbar.Brand></Link>            
        <Link to={this.state.listLinkAll2} > <Navbar.Brand > Reports </Navbar.Brand></Link> 
        <Link to={this.state.chartLinkA} > <Navbar.Brand >Charts </Navbar.Brand></Link>   
        <Link to={this.state.reportsLink} ><Navbar.Brand >Defects</Navbar.Brand></Link>         
        <Navbar.Toggle />
        </Navbar.Header>
          <Navbar.Collapse>
          {this.state.navBtns}
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
};

module.exports = Header;
                    
 {/*  <Navbar collapseOnSelect> <Navbar.Brand >           
           <Link to={this.state.reportsLink} ><p  className="link">Defects</p></Link>       </Navbar.Brand>
           <Link to={this.state.chartLinkA} > <Navbar.Brand > <p  className="link">Charts  </p> </Navbar.Brand></Link>   
           <Navbar.Toggle />
           
           
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  render() {
    return (
      <div  >
       <Navbar >
        <Navbar.Header>                          
        <Link to={this.state.listLinkAll} > <Navbar.Brand >  KPIs </Navbar.Brand></Link>            
        <Link to={this.state.listLinkAll2} > <Navbar.Brand > Reports </Navbar.Brand></Link> 
        <Link to={this.state.chartLinkA} > <Navbar.Brand >Charts </Navbar.Brand></Link>   
        <Link to={this.state.reportsLink} ><Navbar.Brand >Defects</Navbar.Brand></Link>         
        <Navbar.Toggle />
        </Navbar.Header>
         
        <Navbar.Collapse>
          {this.state.navBtns}
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
};

           
           
           
           
           
           
           
           
           
           */}  