import React from 'react';
import './style.css'
import Formik from './Formik';


const FormComponent: React.FC<{id: number}> = ({id}) => {
  return (
    // <Formik
    //   validate={values => {
    //     const errors = {} as User;
    //     if (!values.email) {
    //       errors.email = 'Required';
    //     } else if (
    //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //     ) {
    //       errors.email = 'Invalid email address';
    //     }
    //     return errors;
    //   }}
    //   onSubmit={ async (values, { setSubmitting }) => {
    //     if(id) {
    //       try {
    //         const user = {
    //           cpf: values.cpf,
    //           email: values.email,
    //           estadoCivil: values.estadocivil,
    //           nome: values.name,
    //           nomeConjugue: values.nomeconjugue
    //         } as User
    //         if(!id) {
    //           await api.post('leads', user)
    //         }
    //         else {
    //           await api.put(`/leads/${id}`, user)
    //         }
    //         hystory.push('/')
    //       } catch(err) {
    //         console.log(err)
    //         alert("Algo deu errado")
    //       }

    //     }
    //   }}
    // >
    //   {({
    //     values,
    //     errors,
    //     touched,
    //     handleChange,
    //     handleBlur,
    //     handleSubmit,
    //     isSubmitting,
    //     setFieldValue
    //     /* and other goodies */
    //   }) => (
    //     <form onSubmit={handleSubmit}>
    //       <div className="input-container">
    //         <div className="input">
    //           <label htmlFor="name">Nome</label>
    //           <input type="text" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
    //           {errors.name && touched.name && errors.name}
    //         </div>
    //         <div className="input">
    //           <label htmlFor="cpf">CPF</label>
    //           <InputMask mask="999.999.999-99" value={values.cpf} onChange={e => {
    //             setFieldValue(`cpf.value`, e.target.value)
    //           }} onBlur=     {handleBlur}>
    //           </InputMask>
    //           {errors.cpf && touched.cpf && errors.cpf}
    //         </div>
    //       </div>
    //       <div className="input-container">
    //         <div className="input">
    //         <label htmlFor="email">Email</label>
    //         <input type="text" id="email" value={values.email} onChange=  {handleChange} onBlur={handleBlur} />
    //         {errors.email && touched.email && errors.email}
    //         </div>      
    //         <div className="input">
    //           <label htmlFor="estadoCivil">Estado Civil</label>
    //           <select name="" defaultValue={values.estadocivil}  onChange={handleChange} onBlur={handleBlur} id="estadoCivil">
    //             { !values.estadocivil && <option value="" disabled>Selecione uma opção</option>}
    //             {tipoEstadoCivil.map((estadoCivil, index) => (
    //               <option key={index} selected={estadoCivil.nomeEstadoCivil === values.estadocivil}  value={estadoCivil.nomeEstadoCivil}>{estadoCivil.nomeEstadoCivil}</option>
    //               // <span>{JSON.stringify(estadoCivil)} </span>
    //             ))}
    //           </select>
    //           {errors.estadocivil && touched.estadocivil && errors.estadocivil}
    //         </div>
    //       </div>
    //       <div className="input">
    //         <label htmlFor="nomeconjugue">Nome do Conjugue</label>
    //         <input type="text" value={values.nomeconjugue} onChange={handleChange} onBlur={handleBlur} id="nomeconjugue" disabled={values.estadocivil !== 'Casado(a)'} className={values.estadocivil !== 'Casado(a)' ? 'disabled' : ''} />
    //       </div>
    //       <div className="flex">
    //         <Link className="cancel" to="/">Cancelar</Link>
    //         <input type="submit" className="submit" value="Cadastrar"/>
    //       </div>
    //     </form>
    //   )}
    // </Formik>
    <Formik id={id} />
  );
}

export default FormComponent;