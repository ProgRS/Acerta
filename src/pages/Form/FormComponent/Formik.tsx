import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { User } from '../../Home'
import InputMask from 'react-input-mask'
import api from '../../../services/api'
import { useHistory, Link } from 'react-router-dom'
interface FormikProp {
  id?: number
}
const Formik: React.FC<FormikProp> = ({id}) => {
  const [user, setUser] = useState<User | null>(null)
  const history = useHistory()

  useEffect(() => {
    if(id) {
      api.get(`/leads/${id}`).then(res => {
        console.log(res.data);
        setUser(res.data)
      })
    }
  }, [id])  
  const formik = useFormik({
    initialValues: {
      name: user?.nome || "",
      email: user?.email || "",
      estadocivil: user?.estadoCivil || "",
      cpf: user?.cpf || "",
      nomeconjugue: user?.nomeConjugue || ""
    },
    onSubmit: async(values) => {
      try {
        const data = {
          cpf: values.cpf,
          email: values.email,
          estadoCivil: values.estadocivil,
          nome: values.name,
          nomeConjugue: values.nomeconjugue
        } as User
        console.log(data)
        // if(!id) {
        //   await api.post('leads', data)
        // }
        // else {
        //   await api.put(`/leads/${id}`, data)
        // }
        // history.push('/')
      } catch(err) {
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Obrigatório"),
      email: Yup.string().required("Obrigatório"),
      cpf: Yup.string().required("Obrigatório")
      // estadocivil: Yup.string().required("Obrigatório")
    })
  })
  

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.estadocivil}
          <div className="input-container">
            <div className="input">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </div>
            <div className="input">
              <label htmlFor="cpf">CPF</label>
              <InputMask
                mask="999.999.999-99"
                value={formik.values.cpf}
                name="cpf"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
              </InputMask>
              {formik.errors.cpf && formik.touched.cpf && formik.errors.cpf}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && formik.errors.email}
            </div>      
            <div className="input">
              <label htmlFor="estadoCivil">Estado Civil</label>
              <select
                name="estadoCivil"
                // value={formik.values.estadocivil}
                defaultValue={formik.values.estadocivil}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="estadoCivil"
              >
                <option value="">Selecione uma opcao</option>
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Viuvo(a)">Viuvo(a)</option>
                <option value="Separado(a)">Separado(a)</option>
              </select>
              {formik.errors.estadocivil && formik.touched.estadocivil && formik.errors.estadocivil}
            </div>
          </div>
          <div className="input">
            <label htmlFor="nomeconjugue">Nome do Conjugue</label>
            <input
              type="text"
              value={formik.values.nomeconjugue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="nomeconjugue"
              disabled={formik.values.estadocivil !== 'Casado(a)'}
              className={formik.values.estadocivil !== 'Casado(a)' ? 'disabled' : ''}
            />
          </div>
          <div className="flex">
            <Link className="cancel" to="/">Cancelar</Link>
            <input type="submit" className="submit" value="Cadastrar"/>
          </div>
        </form>
  )
}

export default Formik