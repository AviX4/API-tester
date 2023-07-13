import { useState } from "react";
import { Button, FormGroup, TextInput } from '@carbon/react';
function Query_param(){
    const [params,setParams]= useState([{ id: 1, value1: '', value2: '' }]);
    const handleAddRow = () => {
        const newRow = {
          id: params.length + 1,
          value1: '',
          value2: '',
        };
        setParams([...params, newRow]);
      };
    const handleDelete = (id) => {
        const updatedRows = params.filter((row) => row.id !== id);
        setParams(updatedRows);
        
    };
    const handleChange = (id, field, value) => {
        const updatedRows = params.map((row) => {
          if (row.id === id) {
            return { ...row, [field]: value };
          }
          return row;
        });
        setParams(updatedRows);
    };


    return(
        <div className='query-params'>
                {Object.entries(params).map(val => (
                    <FormGroup className='render-form' key = {val[1].id}>
                        <TextInput  
                            id = {`v1-${val[1].id}`} 
                            onChange={(e) => handleChange(val[1].id, 'value1', e.target.value)}
                        />
                        <TextInput
                            id = {`v2-${val.id}`}
                            onChange={(e)=> handleChange(val[1].id,'value2',e.target.value)}
                        />
                        <Button onClick={()=> handleDelete(val[1].id)} kind="danger--tertiary" size='md'>DELETE</Button>
                    </FormGroup>
                ))}
            <Button className='add-param' onClick={()=> handleAddRow()} kind="secondary">ADD</Button>
        </div>
    )
}
export default Query_param;