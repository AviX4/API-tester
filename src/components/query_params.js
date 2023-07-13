import { useState } from "react";
import { Button, FormGroup, TextInput } from '@carbon/react';
function Query_param(){
    const [params,setParams]= useState([['','']])
    const handleDelete = (index) => {
        const temp = params.splice(index,1);
        console.log(temp)
        setParams(temp);
    };

    return(
        <div className='query-params'>
            <FormGroup >
                {Object.entries(params).map(val => (
                    <div className='render-form' >
                        <TextInput   
                            // onChange={(event) => {
                            //     // Handle input changes here if needed
                            //     console.log(event.target.value);
                            // }}
                        />
                        <TextInput
                        />
                        <Button onClick={()=> handleDelete(val[0])} kind="danger--tertiary" size='md'>DELETE</Button>
                    </div>
                ))}
            </FormGroup>
            <Button className='add-param' onClick={()=> setParams(prevParams => [...prevParams, ['','']])} kind="secondary">ADD</Button>
        </div>
    )
}
export default Query_param;