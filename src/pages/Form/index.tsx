import React from 'react';
import FormComponent from './FormComponent'
import { useParams } from 'react-router-dom';

const Form: React.FC = () => {
  const {id} = useParams()
  
  return (
    <div className="form-page">
      <h1>Cadastro de Leads</h1>
      <FormComponent id={id as number} />
    </div>
  )
}
export default Form;