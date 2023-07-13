import { useState } from "react";
import { Button, FormGroup, TextInput } from '@carbon/react';
function Header({headerTransfer}){
    const [headers,setHeaders]= useState([{ id: 1, value1: '', value2: '' }]);
    const handleAddRow = () => {
        const newRow = {
          id: headers.length + 1,
          value1: '',
          value2: '',
        };
        setHeaders([...headers, newRow]);
    };
    const handleDelete = (id) => {
        const updatedRows = headers.filter((row) => row.id !== id);
        setHeaders(updatedRows);
        headerTransfer(updatedRows);   
    };
    const handleChange = (id, field, value) => {
        const updatedRows = headers.map((row) => {
          if (row.id === id) {
            return { ...row, [field]: value };
          }
          return row;
        });
        setHeaders(updatedRows);
        headerTransfer(updatedRows);
    };

    return(
        <div className='header-params'>
                {Object.entries(headers).map(val => (
                    <FormGroup className='render-form' key = {val[1].id}>
                        <TextInput  
                            id = {`v1-${val[1].id}`} 
                            onChange={(e) => handleChange(val[1].id, 'value1', e.target.value)}
                            placeholder="Key"
                        />
                        <TextInput
                            id = {`v2-${val.id}`}
                            onChange={(e)=> handleChange(val[1].id,'value2',e.target.value)}
                            placeholder="Value"
                        />
                        <Button onClick={()=> handleDelete(val[1].id)} kind="danger--tertiary" size='md'>DELETE</Button>
                    </FormGroup>
                ))}
            <div className="add-button">
                <Button className='add-param' onClick={()=> handleAddRow()} kind="secondary">ADD</Button>
            </div>
        </div>
    )
}
export default Header;