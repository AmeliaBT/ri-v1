
const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/SignUp');
const {Col, Button} = require('react-bootstrap');
const Header = require('./Header');
let arrayOfRIs=[];
class ExportData extends React.Component {
    constructor(props) {
        super(props);          
      this.state = {       
        outCSV: "loading data for csv..." ,
        arrayOfRIs: arrayOfRIs
      }
    }
 
      componentDidMount() { 
    // load reports
      let that = this;
      let xhr = new XMLHttpRequest();       
      xhr.open('POST', '/get-all-users-reports', true); 
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
         let reports2 = response.reports.map((el) => {     
let reportID=  encodeURIComponent( el.reportID );
let inspector=  encodeURIComponent( el.inspector.replace(",", " ") );
let daterec=  encodeURIComponent( el.daterec );
let Gwo=  encodeURIComponent( el.Gwo.replace(",", " ") );
let cwo=  encodeURIComponent( el.cwo.replace(",", " ") );
let dwo=  encodeURIComponent( el.dwo.replace(",", " ") );
let ewo= encodeURIComponent(  el.ewo.replace(",", " ") );
let fwo=  encodeURIComponent( el.fwo.replace(",", " ") );
let hwo=  encodeURIComponent( el.hwo.replace(",", " ") );
let iwo=  encodeURIComponent( el.iwo.replace(",", " ") );
let jwo=  encodeURIComponent( el.jwo.replace(",", " ") );
let kwo=  encodeURIComponent( el.kwo );
let lwo=  encodeURIComponent( el.lwo) ;
let mwo=  encodeURIComponent( el.mwo );
let nwo=  encodeURIComponent( el.nwo );
let owo=  encodeURIComponent( el.owo) ;
let pwo=  encodeURIComponent( el.pwo );
let qwo=  encodeURIComponent( el.qwo );
let rwo=  encodeURIComponent( el.rwo );
let swo=  encodeURIComponent( el.swo.replace(",", " ") );
let two=  encodeURIComponent( el.two.replace(",", " ") );
let record= encodeURIComponent( el.record.replace(/[^a-z0-9]+/gi, " ")) ;
let uwo=  encodeURIComponent( el.uwo )+'%0A';
           
           arrayOfRIs.push([
           reportID ,
inspector ,
daterec ,
Gwo ,
cwo ,
dwo ,
ewo ,
fwo ,
hwo ,
iwo ,
jwo ,
kwo ,
lwo ,
mwo ,
nwo ,
owo ,
pwo ,
qwo ,
rwo ,
swo ,
two ,
record ,
uwo ]) ;              
           return
        });
     arrayOfRIs.unshift(     
"id"+'%2C' , 
"Inspector"+'%2C' , 
"Date Received"+'%2C' , 
"Description"+'%2C' , 
"Date Received"+'%2C' , 
"WO / PO / MTT"+'%2C' , 
"Supplier"+'%2C' , 
"P/N"+'%2C' , 
"Documentation Revision"+'%2C' , 
"Received SW"+'%2C' , 
"Date Inspected"+'%2C' , 
"NO"+'%2C' , 
"photo 1"+'%2C' , 
"Source"+'%2C' , 
"Destination"+'%2C' , 
"Lot Size"+'%2C' , 
"Sample Size"+'%2C' , 
"Qty Defective"+'%2C' , 
"Qty Rejected"+'%2C' , 
"DMR "+'%2C' , 
"Pass / Fail"+'%2C' , 
"comment -note"+'%2C' , 
"photo 2"+'%0A' )
       
         let reportsCSV=arrayOfRIs.reduce( (acc, x) => acc +x);  
        let myURLcsv="data:application/octet-stream;/csv;charset=UTF-8;page=21,"+reportsCSV;
           that.setState({
                outCSV:myURLcsv,
             arrayOfRIs:decodeURIComponent(reportsCSV)
           });            
       }    
  }
  
    render() { 
        return (
            <div>            
               <Header/> 
            <div  className="FormSU">  
      
   <Col className="form-labelSU" sm={6}>
                Export RI data to .csv file  
                </Col>
                <Col sm={6}>
                  <Button className="btn btn-primary btn-block"  >                
                    <a href={this.state.outCSV}  download="RI_data.csv">   
                  <p className="form-labelSU"  >  EXPORT </p>
                    </a>
                  </Button> 
                </Col>     
                 <br/>    <br/>    <br/>      
        </div>         
    
            </div>
        );
    }
}
 
module.exports = ExportData;

