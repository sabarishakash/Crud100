import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { delete_url, get_url, post_url, update_url } from './URL/Url';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(''); // Initialize DOB state with current date
const[socialMedia,setSocialMedia]=useState("");
  const [data, setData] = useState([]);
  const [ref, setRef] = useState(true);

  const Posts = async () => {
    await axios.post(post_url, {
      Email,
      name,
      gender,
      dob, // Include dob in the post request
      socialMedia
    });
  }

  useEffect(() => {
    axios.get(get_url).then((res) => {
      setData(res.data);
    });
  }, [ref]); // Add ref as dependency to useEffect to trigger it on ref change

  const del = (v) => {
    axios.delete(`${delete_url}/${v._id}`).then(() => {
      setRef(!ref);
    });
  }

  const edit = (v) => {
    setEmail(v.Email);
    setName(v.name);
    setGender(v.gender);
    setDob(v.dob); // Set DOB to the value fetched from data
    setSocialMedia(v.socialMedia);
  }

  const update = async (v) => {
    await axios.put(`${update_url}/${v._id}`, {
      Email,
      name,
      gender,
      dob, // Include dob in the update request
      socialMedia
    }).then(() => {
      setEmail("");
      setName("");
      setGender("");
      setDob(""); // Reset DOB to current date after update
      setSocialMedia("");
    }).catch((err) => {
      console.log("Error");
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form className='shadow p-3'>
        <h2 className='text-center'>Entry Form</h2>

            <div className="mb-3 mt-3">
              <label style={{fontWeight:"bold"}} htmlFor="email">Email:</label>
              <input value={Email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Please enter email" name="email" />
            </div>
            <div className="mb-3">
              <label style={{fontWeight:"bold"}} htmlFor="name">Name:</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Please enter name" name="name" />
            </div>
            <div className="mb-3">
              <label style={{fontWeight:"bold"}} htmlFor="gender">Gender:</label><br />
              <div className="form-check form-check-inline">
                <input value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="form-check-input" type="radio" name="gender" id="male" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="form-check-input" type="radio" name="gender" id="female" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="female">Female</label>
              </div>
            </div>
            <div className="mb-3">
              <label style={{fontWeight:"bold"}} htmlFor="dob">DOB:</label><br />
              <input type='date'
              onChange={(e)=>setDob(e.target.value)}
              value={dob}
              />
            </div>
            <div className="mb-3">
              <label style={{fontWeight:"bold"}} htmlFor="socialmedia">Social Media:</label><br />
              <div className="form-check form-check-inline">
                <input value="linkedin" checked={socialMedia === 'linkedin'} onChange={(e) => setSocialMedia(e.target.value)} className="form-check-input" type="checkbox" name="socialmedia" id="linkedin" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="linkedin">Linkedin</label>
              </div>
              <div className="form-check form-check-inline">
                <input value="facebook" checked={socialMedia === 'facebook'} onChange={(e) => setSocialMedia(e.target.value)} className="form-check-input" type="checkbox" name="socialmedia" id="facebook" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="facebook">Facebook</label>
              </div>
              <div className="form-check form-check-inline">
                <input value="instagram" checked={socialMedia === 'instagram'} onChange={(e) => setSocialMedia(e.target.value)} className="form-check-input" type="checkbox" name="socialmedia" id="instagram" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="instagram">Instagram</label>
              </div>
              <div className="form-check form-check-inline">
                <input value="twitter" checked={socialMedia === 'twitter'} onChange={(e) => setSocialMedia(e.target.value)} className="form-check-input" type="checkbox" name="gender" id="twitter" />
                <label style={{fontWeight:"bold"}} className="form-check-label" htmlFor="twitter">Twitter</label>
              </div>
            </div>
            <button onClick={Posts} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <table className="table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Serial No</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope='col'>Social Media</th>
                <th scope="col">DOB</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v, index) => (
                <tr key={v._id}>
                  <td>{index + 1}</td>
                  <td>{v.Email}</td>
                  <td>{v.name}</td>
                  <td>{v.gender}</td>
                  <td>{v.socialMedia}</td>
                  <td>{v.dob}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => edit(v)}>Edit</button>
                    <button className="btn btn-warning" onClick={() => update(v)}>Update</button>
                    <button className="btn btn-danger" onClick={() => del(v)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}

export default App;
