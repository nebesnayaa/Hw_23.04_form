import { useForm } from "react-hook-form";
import axios from 'axios';

function HookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode:"onTouched",
    defaultValues:{ email:"", login:"", gender:"", role:"", status:"" },
  });

  const formDataSet = async (data: any, e: any) => {
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      if (response.status = 201) {
        console.log(response);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  console.log(errors);

  return (<>
    <div className="form">
      <h1>Hw react 2</h1>
      <h3>React Hook Form</h3>

      <form action="#" onSubmit={ handleSubmit(formDataSet) }>
        <div className="mb-3">
          <label htmlFor="inputEmail2" className="form-label title">Email address</label>
          <input type="text" 
              {...register("email", 
                { required: {value: true, message: "This field can't be empty"}, 
                  pattern: {value: /^\S+@\S+$/i, message:"Invalid email" }})
              } 
              className="form-control border-success" id="inputEmail2" aria-describedby="helpEmail" />
          <div id="helpEmail" className="form-text">We'll never share your email with anyone else.</div>
          { errors.email && <p className="error">{errors.email.message}</p> }
        </div>

        <div className="mb-3">
          <label htmlFor="inputLogin2" className="form-label title">Login</label>
          <input type="text" 
              {...register("login", 
                { required: {value: true, message: "This field can't be empty"}, 
                  minLength: {value: 5, message: "Login is too short (min - 5)" }})
              } 
              className="form-control border-success" id="inputLogin2" />
          { errors.login && <p className="error">{errors.login.message}</p> }
        </div>

        <div className="mb-3">
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input type="radio" {...register("gender")} 
                   className="btn-check" value="male" id="radio5" checked />
            <label className="btn btn-outline-success" htmlFor="radio5">Male</label>

            <input type="radio" {...register("gender")} 
                   className="btn-check" value="female" id="radio6" />
            <label className="btn btn-outline-success" htmlFor="radio6">Female</label>
          </div>
        </div>

        <div className="mb-3">
          <select className="form-select border-success" 
              {...register("role", {required: {value: true, message: "This field can't be empty"}})} 
              aria-label="Select role">
            <option value="user" selected>User</option>
            <option value="user">Manager</option>
            <option value="admin">Admin</option>
          </select>
          { errors.role && <p className="error">{errors.role.message}</p> }
        </div>

        <div className="mb-3">
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input type="radio" {...register("status")} 
                   className="btn-check" value="enable" id="radio7" checked />
            <label className="btn btn-outline-success" htmlFor="radio7">Enable</label>

            <input type="radio" {...register("status")} 
                   className="btn-check" value="disable" id="radio8" />
            <label className="btn btn-outline-success" htmlFor="radio8">Disable</label>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  </>
  )
}

export default HookForm;

