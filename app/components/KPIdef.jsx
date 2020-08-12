// for component RIlistAll; this defines formulas for KPI 
const React = require('react');
const { Row, Col } = require('react-bootstrap');


class KPIdef extends React.Component {
   render() {
      return (<div>
          
  <div   className=" well myForm"  > 
       <Row>             
              <Col sm={3} >  <h4 >Key Performance Indicators  </h4> 
                LotT -number of lots tested<br/> </Col> 
              <Col sm={3} >LotA - number of lots accepted<br/>
LAR % - Lot Acceptance Rate  (LAR=LotA/LotT*100)<br/> </Col> 
              <Col sm={3} >LotQty - sum of items in all lots<br/>
QtyT - number of items tested<br/></Col> 
              <Col sm={3} >QtyDef - number of items defective<br/>
%Def - % of items defective (%Def=QtyDef/QtyT*100)     </Col> 
              
             
           </Row>        
 </div>
          

    
     
 </div>)
   }

}


module.exports = KPIdef;
