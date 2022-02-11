import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';
import PhoneInput, {  isValidPhoneNumber } from 'react-phone-number-input'
const Contact=()=>{

    const [contact,setContact] =useState({
        name: '',
        email: '',
        phone:'',
        subject: '',
        message: ''
    });
    const [output, setOutput] = useState(null);
    const triggerEmail= (event )=>{
        event.preventDefault();
        axios.post('http://localhost:5000/sendEmail', { ...contact })
        .then(response => {
          setOutput(response.data);
          setContact({ name: '', email: '', phone:'', subject: '', message: '' });        
        })
        .catch(() => {
          setOutput({ success: false, message: 'Please try again later'});
      });
        //console.log('Will fill this shortly');
    }

    //passing the form data as a JSON object by spreading the state object using 
    //{...contact} which is same as { name: name_value, email: email_value, .. }
    const formChange =( event )=> {
        const { name, value } = event.target;
        setContact({
          ...contact,
          [name]: value
        });
      };

      //name property that has to match with the state properties so we are able to use the same event handler
      // for all the input fields and using ES6 dynamic object key syntax update the state value of each input field

    return(

        <div className="container1">
            <h2 style={{ margin:'2rem',textAlign:'center',color:'white'}}>HAVE A QUERY &#63; CONTACT US</h2>
                    {output && (
                        <p className={`${output.success ? 'success' : 'error'}`} style={{ margin:'2rem',textAlign:'center'}}>
                        {output.message}
                        </p>
                        )}
                    <form onSubmit={triggerEmail}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="col-75">
                                <input className="nameTextBox" type="text" id="name" name="name" value={contact.name} placeholder="Name.." required  onChange={formChange}/>
                            </div>
                        </div>

                        <div className="row">
                        <div className="col-25">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="col-75">
                            <input className="emailTextBox" type="email" id="email" name="email"  value={contact.email} placeholder="abc@gmail.com" required onChange={formChange}/>
                        </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="col-75">
                            <input className ="phoneTextBox" type="tel" id="phone" name="phone" value={contact.phone} placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onChange={formChange}/>       
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="subject">Subject</label>
                            </div>
                            <div className="col-75">
                                <input className="subjTextBox" type="text" id="subject" name="subject" value={contact.subject} placeholder="Enter subject" required onChange={formChange}/>
                            </div>
                        </div>
                      
                        <div className="row">
                        <div className="col-25">
                            <label htmlFor="message">Message</label>
                        </div>
                        <div className="col-75">
                            <textarea className="messageTextArea" id="message" name="message"  value={contact.message} placeholder="Write your query.." required  style={{height:"200px"}} onChange={formChange}>
                            </textarea>
                        </div>
                        </div>
                        <br/><br/><br/>
                        <div className="rows" >
                        <input className= "submitButton" type="submit" value="Submit" />
                        </div>

                    </form>
                </div>
        

    /*

            <div classnameName="container" style={{letterSpacing: '1px'}}>
                <div classnameName="col-md-6 offset-md-3"> 
                <h2 style={{ margin: '20px',textAlign:'center',color:'white'}}>HAVE A QUERY &#63; CONTACT US</h2>
                <form onSubmit={triggerEmail}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={contact.name} placeholder="Enter your name" onChange={formChange}/>
                </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={contact.email}
                            placeholder="Enter your email address"
                            onChange={formChange}/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={contact.phone}
                            placeholder="xxx-xxx-xxxx"
                            onChange={formChange}/>
                    </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    value={contact.subject}
                                    placeholder="Enter subject"
                                    onChange={formChange} />
                        </Form.Group>
                        <Form.Group controlId="subject">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="message"
                            value={contact.message}
                            rows="3"
                            placeholder="Enter your message"
                            onChange={formChange}
                        />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{color:'black'}}>
                        Submit
                        </Button>
                    </form>
                </div>         
            </div>
    )
}*/
    )
}
export default Contact;