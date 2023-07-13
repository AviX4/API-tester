import { useState } from 'react';
import './app.scss';
import { Tabs , Tab, Button , FormGroup, Dropdown, TextInput, TabList, TabPanels, TabPanel} from '@carbon/react';
import Header from './components/headers';
import Query_param from './components/query_params';
import axios from 'axios';

function App() {
  const req = ['GET','PUT','POST','PATCH','DELETE'];
  const [lnk,setLnk]= useState('');
  const [met,setMet]= useState('GET');
  const [params,setParams]= useState(new Map());
  const [headers,setHeaders]= useState(new Map());

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
    axios({
      url: lnk,
      method:met,
      // params:params,
      // headers:headers,
    }).then(response=>{
      console.log(response);
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
    </div>
  );
}

export default App;
