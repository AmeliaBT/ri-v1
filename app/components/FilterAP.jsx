//Fillter component used in many pages
const React = require('react');

const style = require('../styles/FilterA');
const {Pagination, PageItem} = require('react-bootstrap');
class FilterA extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { 
      model: '', 
      pn: '' ,
      comment: '' ,
      sel_radio_a: '',
      sel_radio_b: '',
      sel_radio_c: '',
      sel_radio_d: '',
      supplier:'',
      source:'',
      destination:'',
      riN:"",
      clearFilter:false,
      nPage:1, //current page
      lastPage:1,
      perPage: 50 //limit of items per page from server.js
      
} 

   this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
      this.clearForm = this.clearForm.bind(this);
     this.onRadioChange = this.onRadioChange.bind(this);
     this.onRadioChangeB = this.onRadioChangeB.bind(this);
    this.onRadioChangeC = this.onRadioChangeC.bind(this);
    this.onRadioChangeD = this.onRadioChangeD.bind(this);
    // this.pageChanged = this.pageChanged.bind(this);
    this.pageChangedNext = this.pageChangedNext.bind(this);
     this.pageChangedPrev = this.pageChangedPrev.bind(this);
      this.pageChangedFirst = this.pageChangedFirst.bind(this);
    this.pageChangedLast = this.pageChangedLast.bind(this);
}  
  
  
  componentDidMount() {
  // get  number of documents for pagination    
   let that = this;
   let perPage=this.state.perPage;
   const xhr = new XMLHttpRequest();      
   xhr.open('POST', '/count-documents', true);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    //  let body = 'perPage=' + encodeURIComponent(perPage);
    xhr.send();    
  
   xhr.onreadystatechange = function() {
     if (this.readyState != 4) return;
     if (this.status != 200) {
       alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
       return;
     }
     let response = JSON.parse(this.responseText);
       let  total_docs=response.totalDocs; 
    
      let last_page= Math.ceil(total_docs/perPage); 
    
          that.setState({
            totalDocs:total_docs,
            lastPage:last_page   
            
        });
       //}
     }   
} 
  
  
  
  
submitForm(e) { 
  e.preventDefault(); 
  //check if any filter was set
  this.props.handleData(this.state) } ;  

  clearForm() {
    this.setState({ 
       model: '', 
      pn: '' ,
       comment: '' ,
     sel_radio_a: '',
      sel_radio_b: '',
       sel_radio_c: '',
      sel_radio_d: '',
      supplier:'',
  source:'',
  destination:'',
       riN:"",
      clearFilter:true, //do not load table
      nPage:1
  
    }); 
  }
  
  
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
     if (value !== ''){this.setState( {clearFilter:false})};
      const name = target.name;
      this.setState({ [name]: value });
  }
  
   onRadioChange(e){
    this.setState({
      sel_radio_a: e.target.value
    });
        if (e.target.value !== ''){this.setState( {clearFilter:false})};
     
  }
  onRadioChangeB(e){
    this.setState({
      sel_radio_b: e.target.value
    });
      if (e.target.value !== ''){this.setState( {clearFilter:false})};
  }
   onRadioChangeC(e){
    this.setState({
      sel_radio_c: e.target.value
    });
       if (e.target.value !== ''){this.setState( {clearFilter:false})};
  }
  onRadioChangeD(e){
    this.setState({
      sel_radio_d: e.target.value
    });
      if (e.target.value !== null){this.setState( {clearFilter:false})};
  }

 pageChangedNext(e){
  let nMax=this.state.lastPage;   
  let n= this.state.nPage;  
   if(n < nMax){
     n=n+1;
  this.setState({nPage: n} )  ;
   
   }
   
   }
 pageChangedPrev(e){
let n= this.state.nPage;
if(n>1){
  n= n -1;
  this.setState({nPage: n} )  ; 
}
}
  pageChangedFirst(e){
  let n= 1;
  this.setState({nPage: n} )  ; 
   }
  pageChangedLast(e){

   let n=this.state.lastPage;
      this.setState({nPage: n} )  ; 

   }
  
  
  render() { return (        <div>  
      
  
<form>
  <input type="button" value="Submit" onClick={this.submitForm}/> &nbsp; &nbsp;&nbsp; &nbsp;
   <input type="button" value="Clear" onClick={this.clearForm}/><br />
  
  {/*pagination    Page {this.state.nPage} of {this.state.lastPage}  <br />  <p> Total RIs: {this.state.totalDocs}  </p>*/}

<Pagination size="sm"  >
  <Pagination.First onClick={this.pageChangedFirst }/>
  <Pagination.Prev onClick={this.pageChangedPrev }/> 
  <Pagination.Item active >   {this.state.nPage}  </Pagination.Item>

  <Pagination.Next onClick={this.pageChangedNext }/>
  <Pagination.Last onClick={this.pageChangedLast } />
</Pagination>
  
  

  <br />
  
  RI Number: <br />
  <input className="filter_input_a" type="text" name="riN"  value={this.state.riN} 
    onChange={this.handleChangeValue}/>  <br />
Description/ Model: <br />
  <input className="filter_input_a" type="text" name="model"  value={this.state.model} 
    onChange={this.handleChangeValue}/>  <br />
Part Number: <br />
  <input className="filter_input_a" type="text" name="pn"  value={this.state.pn} 
    onChange={this.handleChangeValue} /> <br />
  
  Comment: <br />
  <input className="filter_input_a" type="text" name="comment"  value={this.state.comment} 
    onChange={this.handleChangeValue} /> <br /> 
  Inspector: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="Tuan"
                  checked={this.state.sel_radio_a === "Tuan"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Tuan</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="Jim"
                  checked={this.state.sel_radio_a === "Jim"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Jim</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={this.state.sel_radio_a === "Other"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl" >Other</span>
              </label>
            </li> 
          </ul>  
  
  supplier: <br />
  <input className="filter_input_a" type="text" name="supplier"  value={this.state.supplier} 
    onChange={this.handleChangeValue} /> <br />
 Source: <br />
  <input className="filter_input_a" type="text" name="source"  value={this.state.source} 
    onChange={this.handleChangeValue} /> <br />
  Destination: <br />
  <input className="filter_input_a" type="text" name="destination"  value={this.state.destination} 
    onChange={this.handleChangeValue} /> <br />

Pass/Fail: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="Pass"
                  checked={this.state.sel_radio_b === "Pass"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl">Pass</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="Fail"
                  checked={this.state.sel_radio_b === "Fail"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl">Fail</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={this.state.sel_radio_b === "Other"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl" >Other</span>
              </label>
            </li> 
          </ul>    
  
  
   
 Lot Size: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="<100"
                  checked={this.state.sel_radio_c === "<100"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl">  &lt; 100 </span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="100-1000"
                  checked={this.state.sel_radio_c === "100-1000"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl">100-1000</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value=">1000"
                  checked={this.state.sel_radio_c === ">1000"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl" > &gt; 1000 </span>
              </label>
            </li> 
          </ul>  
  Date Span: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="last12"
                  checked={this.state.sel_radio_d === "last12"}
                  onChange={this.onRadioChangeD}
                />
                <span className="filter_lbl"> last 12 months</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={this.state.sel_radio_d === "all"}
                  onChange={this.onRadioChangeD}
                />
                <span className="filter_lbl">all</span>
              </label>  
      </li>              
            
          </ul>  

  
      
      </form>    
   
    
    </div>    )  }}


module.exports = FilterA;

 /* 
   <Pagination bsSize="sm">
  <Pagination.First disabled={selectedPage === 0} onClick={() => onChange(0)}/>
  <Pagination.Prev disabled={selectedPage === 0} onClick={() => onChange(selectedPage - 1)}/>
  {pages.map(page => (
    
      <Pagination.Item key={page} active={page === selectedPage} onClick={() => onChange(page)} activeLabel={'actual'}>
      {page + 1}
    </Pagination.Item>
  ))}
  <Pagination.Next disabled={selectedPage === pages - 1} onClick={() => onChange(selectedPage + 1)}/>
  <Pagination.Last disabled={selectedPage === pages - 1} onClick={() => onChange(pages - 1)}/>
</Pagination>
   +++++++++++++++++++++++++++++++++++
   <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
   
   -end pagination */