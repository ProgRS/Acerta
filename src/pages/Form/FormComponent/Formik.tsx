/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { User } from '../../Home'
import InputMask from 'react-input-mask'
import api from '../../../services/api'
import { useHistory, Link } from 'react-router-dom'
interface FormikProp {
  id?: number
}


const MyFormik: React.FC<FormikProp> = ({ id }) => {
  const history = useHistory()
  console.log(id)

  interface ValuesProps {
    cpf: string
    email: string
    estadoCivil: string
    nome: string
    nomeConjugue: string
  }

const onSubmit = async (values: ValuesProps) => {
  try {
    console.log(values)
    if (!id) {
      await api.post('leads', values)
    }
    else {
      await api.put(`/leads/${id}`, values)
    }
    history.push('/')
  } catch (err) {
    console.log(err)
  }
}
const initialValues = {
  nome: "",
  email: "",
  estadoCivil: "",
  cpf: "",
  nomeConjugue: ""
}
const validationSchema = Yup.object({
  nome: Yup.string().required("Obrigatório"),
  email: Yup.string().required("Obrigatório").email("Email invalido"),
  cpf: Yup.string().required("Obrigatório"),
  estadoCivil: Yup.string().required("Obrigatório")
})
  return (
    <Formik
      initialValues={
        initialValues
      }
      validationSchema={
        validationSchema
      }
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values}) => {
        const [user, setUser] = useState<any>({ cpf: '', email: '', estadoCivil: '', nome: '', nomeConjugue: '' })
        useEffect(() => {
          if (id) {
            api.get(`/leads/${id}`).then(res => {
              console.log(res.data);
              setUser(res.data)
            })
          }
        }, [])
        useEffect(() => {
          const fields = Object.keys(user)
          fields.forEach((field) => setFieldValue((field), user[field], false))
        }, [setFieldValue, user])
        return (
          <Form>
          <div className="input-container">
            <div className="input">
              <label htmlFor="nome">Nome:</label>
              <Field
                type="text"
                name="nome"
                id="cpf"
              />
              <ErrorMessage component="span" name="nome" />
            </div>
            <div className="input">
              <label htmlFor="cpf">CPF:</label>
              <Field type="text" name="cpf" id="cpf" render={({ field }: any) => (
                <InputMask mask="999.999.999-99" {...field} />
              )} />
              <ErrorMessage name="cpf" component="span" />
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div className="input">
              <label htmlFor="estadoCivil">Estado Civil:</label>
              <Field name="estadoCivil" component={"select"}>
                <option value="">Selecione uma opcao</option>
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Viuvo(a)">Viuvo(a)</option>
                <option value="Separado(a)">Separado(a)</option>
              </Field>
              <ErrorMessage name="estadoCivil" component="span" />
            </div>
          </div>
          <div className="input">
            <label htmlFor="nomeConjugue">Nome do Conjugue:</label>
            <Field type="text" name="nomeConjugue" disabled={values.estadoCivil !== "Casado(a)"} id="nomeconjugue" />
          </div>
          <div className="flex">
            <Link className="cancel" to="/">Cancelar</Link>
            <input type="submit" className="submit" disabled={isSubmitting} value="Cadastrar" />
          </div>
        </Form>
        )
      }}
    </Formik>
  )
}

export default MyFormik