import { useState } from 'react';
import './App.css';
import './app.scss';
import { Tabs , Tab, Button , FormGroup, Dropdown, TextInput, TabList, TabPanels, TabPanel} from '@carbon/react';


function App() {
  const req = ['GET','PUT','PATCH','DELETE']
  const [lnk,setLnk]= useState('https://')
  const [dispatch,setDispatch]= useState([])
  return (
    <div>
      <FormGroup style={{ display: 'flex', alignItems: 'center', padding: '0 100px'}}>
        <Dropdown items={req} initialSelectedItem={req[0]} style={{ width: '150px' }} />
        <TextInput style={{ flex:'1' }} placeholder={lnk} />
        <Button type='submit' style={{ width:'150px' }}>Run</Button>
      </FormGroup>
      <div style={{padding:'0 100px'}}>
        <Tabs >
          <TabList>
            <Tab>Query Params</Tab>
            <Tab>Headers</Tab>
            <Tab>JSON</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>content 1</TabPanel>
            <TabPanel>content 2</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
