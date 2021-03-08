import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AddBeerPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '', tagline: '', first_brewed: '', description: '', abv: ''
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

	const addbeerHandler = async () => {
    try {
      const data = await request('beer/addbeer', 'POST', {...form}, {
				Authorization: `Bearer ${auth.token}`
			})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

	return (
		<div className="row">
			<div className="col">
				<div className="card">
              <div className="card-header">
							Add new beer
              </div>
              <div className="card-body">
                  <form>
                      <div className="form-group">
												<label htmlFor="name">Name</label>
												<input 
													id="name" 
													name="name" 
													type="text" 
													className="form-control"  
													placeholder="Name" 
													onChange={changeHandler}
												/>
                      </div>
                      <div className="form-group">
												<label htmlFor="password">Tagline</label>
												<input 
													id="tagline" 
													name="tagline" 
													type="text" 
													className="form-control" 
													placeholder="tags" 
													onChange={changeHandler}
												/>
                      </div>
											<div className="form-group">
												<label htmlFor="password">First brewed</label>
												<input 
													id="first_brewed" 
													name="first_brewed" 
													type="date" 
													className="form-control" 
													onChange={changeHandler}
												/>
                      </div>
											<div className="form-group">
												<label htmlFor="password">Description</label>
												<input 
													id="description" 
													name="description" 
													type="test" 
													className="form-control" 
													placeholder="About" 
													onChange={changeHandler}
												/>
                      </div>
											<div className="form-group">
												<label htmlFor="password">Abv</label>
												<input 
													id="abv" 
													name="abv" 
													type="test" 
													className="form-control" 
													placeholder="5.0" 
													onChange={changeHandler}
												/>
                      </div>

                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <button 
												type="submit" 
												className="btn btn-outline-success"
												onClick={addbeerHandler}
												disabled={loading}
                      >
												Save
											</button>
                  </form>
              </div>
              <div className="card-footer text-muted text-10">
                  Do not drive with alcohol
              </div>            
          </div>
			</div>
		</div>
	)
}
