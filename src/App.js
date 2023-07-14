import { useState } from 'react';
import './app.scss';
import { Tabs, CodeSnippet , Tab, Button ,InlineLoading, FormGroup, Dropdown, TextInput, TabList, TabPanels, TabPanel, Table, TableCell, TableBody, TableRow} from '@carbon/react';
import Header from './components/headers';
import Query_param from './components/query_params';
import axios from 'axios';
import prettyBytes from 'pretty-bytes';

function App() {
  const req = ['GET','PUT','POST','PATCH','DELETE'];
  const [lnk,setLnk]= useState('');
  const [met,setMet]= useState('GET');
  const [params,setParams]= useState({});
  const [headers,setHeaders]= useState({});
  const [response,setResponse]= useState({'data':{},'headers':{}});
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
  axios.interceptors.request.use(req=>{
    req.timeData = {};
    req.timeData.startTime = new Date().getTime();

    return req;
  });

  axios.interceptors.response.use(req=>{
    req.config.timeData.disp = new Date().getTime()- req.config.timeData.startTime;
    return req;
  },function(e){ 
    console.log(e);
    // e.config.timeData.disp = new Date().getTime()- e.config.timeData.startTime;
    return e.response;
  });
 
  const handleRun=()=>{
    setFetchInitiated(true);
    setResponse({'data':{},'headers':{}});
    
    axios({
      url: lnk,
      method:met,
      params:params,
      headers:headers,
    }).catch(e=>e).then(response=>{
      setResponse(response);
      setFetchInitiated(false);
    })
  }

  function renderHeaderTable(headerTable){
    return(
      <div className='table'>
        <Table >
          <TableBody>
          { 
            Object.entries(headerTable).map((v,k)=>(
              <TableRow>
                <TableCell>{v[0]}</TableCell>
                <TableCell>{v[1]}</TableCell>
              </TableRow> 
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      <FormGroup className='component-container' >
        <Dropdown items={req} label='dp' id='default' initialSelectedItem={req[0]}  className='dropdown' onChange={(e)=>setMet(e.selectedItem)} />
        <TextInput  id= 'url' placeholder='https://' className='text-input' onChange={(e) => setLnk(e.target.value)}/>
        <Button type='submit' className='button' size='md' onClick={()=>handleRun()} disabled={fetchInitiated}>Run</Button>
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
            <TabPanel><editor/></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
        { 
          response.status ? (
            <div className='response'>
              <h2>Response</h2>
              <div className='xi'>
              <div className='xo'>Status : {response.status}</div><div className='xo'>Size : {prettyBytes(JSON.stringify(response.data).length+JSON.stringify(response.headers).length)}</div><div className='xo'>Time : {response.config.timeData.disp} ms</div>
              </div>
              <div className='response-block' style={{'padding':'10px'}}>
                <Tabs>
                  <TabList>
                    <Tab>Body</Tab>
                    <Tab>Header</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel><div className='disp_json'><CodeSnippet type='multi'>{JSON.stringify(response.data)}</CodeSnippet></div></TabPanel>
                    <TabPanel >{response.header!=={} ? renderHeaderTable(response.headers):''}</TabPanel>
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
