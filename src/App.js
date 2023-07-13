import { useState } from 'react';
import './app.scss';
import { Tabs , Tab, Button , FormGroup, Dropdown, TextInput, TabList, TabPanels, TabPanel} from '@carbon/react';
import Header from './components/headers';
import Query_param from './components/query_params';


function App() {
  const req = ['GET','PUT','POST','PATCH','DELETE']
  const [lnk,setLnk]= useState('https://')
  const [dispatch,setDispatch]= useState([])
  return (
    <div>
      <FormGroup className='component-container' >
        <Dropdown items={req} label='dp' id='default' initialSelectedItem={req[0]}  className='dropdown' />
        <TextInput  id= 'url' placeholder={lnk} className='text-input' />
        <Button type='submit' className='button' size='md'>Run</Button>
      </FormGroup>
      <div className = 'tab-container'>
        <Tabs >
          <TabList>
            <Tab>Query Params</Tab>
            <Tab>Headers</Tab>
            <Tab>JSON</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Query_param/></TabPanel>
            <TabPanel><Header/></TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
