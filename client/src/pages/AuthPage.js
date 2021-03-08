import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    username: '', password: ''
  })

  useEffect(() => {
  message(error)
  clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
 
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col-md-2">&nbsp;</div>
      <div className="col-md-8">
          <div>&nbsp;</div>
          <div className="card">
              <div className="card-header">
                  Authorisation || Registration
              </div>
              <div className="card-body">
                  <form>
                      <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input 
                              id="name" 
                              name="username" 
                              type="text" 
                              className="form-control" 
                              placeholder="Name or Email" 
                              onChange={changeHandler}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input 
                              id="password" 
                              name="password" 
                              type="password" 
                              className="form-control" 
                              placeholder="any secret symbols" 
                              onChange={changeHandler}
                          />
                      </div>

                      <button 
                          type="submit" 
                          className="btn btn-primary"
                          onClick={loginHandler}
                          disabled={loading}
                      >
                          Login
                      </button>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <button 
                          type="submit" 
                          className="btn btn-outline-primary"
                          onClick={registerHandler}
                          disabled={loading}
                      >
                          Register
                      </button>

                  </form>
              </div>
              <div className="card-footer text-muted text-10">
                  All data be safe
              </div>            
          </div>
      </div>
      <div className="col-md-2">&nbsp;</div>
    </div>

  )
}
