import { useState } from 'react';
import './app.scss';
import { Tabs , Tab, Button ,InlineLoading, FormGroup, Dropdown, TextInput, TabList, TabPanels, TabPanel} from '@carbon/react';
import Header from './components/headers';
import Query_param from './components/query_params';
import axios from 'axios';


function App() {
  const req = ['GET','PUT','POST','PATCH','DELETE'];
  const [lnk,setLnk]= useState('');
  const [met,setMet]= useState('GET');
  const [params,setParams]= useState({});
  const [headers,setHeaders]= useState({});
  const [response,setResponse]= useState(null);
  const [fetchInitiated,setFetchInitiated] = useState(false);

  const paramTransfer=(data)=>{
    const map = new Map();
    data.map((d)=> map.set(d.value1,d.value2));
    setParams(map);
  }
  const headerTransfer = (data)=>{
    const map= new Map();
    data.map((d)=> map.set(d.value1,d.value2));
    setHeaders(map);
  }
  const handleRun=()=>{
    setFetchInitiated(true);
    setResponse(null);
    axios({
      url: lnk,
      method:met,
      params:params,
      headers:headers,
    }).then(response=>{
      setResponse(response);
      setFetchInitiated(false);
    })

  }
  
  return (
    <div>
      <FormGroup className='component-container' >
        <Dropdown items={req} label='dp' id='default' initialSelectedItem={req[0]}  className='dropdown' onChange={(e)=>setMet(e.selectedItem)} />
        <TextInput  id= 'url' placeholder='https://' className='text-input' onChange={(e) => setLnk(e.target.value)}/>
        <Button type='submit' className='button' size='md' onClick={()=>handleRun()}>Run</Button>
      </FormGroup>
      <div className = 'tab-container'>
        <Tabs >
          <TabList>
            <Tab>Query Params</Tab>
            <Tab>Headers</Tab>
            <Tab>JSON</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Query_param paramTransfer={paramTransfer}/></TabPanel>
            <TabPanel><Header headerTransfer={headerTransfer}/></TabPanel>
            <TabPanel>{met},{lnk}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
        {
          response!==null ? (
            <div className='response'>
              <h2>Response</h2>
              <p style={{'padding':'10px'}}>Status:{}  Size:{}  Time:{}</p>
              <div className='response-block' style={{'padding':'10px'}}>
                <Tabs>
                  <TabList>
                    <Tab>Body</Tab>
                    <Tab>Header</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>JSON EDITOR</TabPanel>
                    <TabPanel>Header</TabPanel>
                  </TabPanels>
                </Tabs> 
              </div>
            </div>
          ):fetchInitiated ? (
            <InlineLoading status="active" iconDescription="Loading" description="Loading data..." className='loading'/>
          ):(
            <div/>
          )
        }
      
    </div>
  );
}

export default App;
