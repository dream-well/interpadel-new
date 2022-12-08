import { useState } from 'react';
import { Form, InputPicker, DatePicker, Button, Input  } from 'rsuite';

export default function ProfileEdit() {
  const [formValue, setFormValue] = useState({});

  return (
    <div className='flex flex-col my-[6.25rem] bg-[#1d1829]'>
        <span className='font-bold px-[4.375rem] py-[2.5rem] text-[#1D1829] text-[2rem] bg-[#c2ff00]'>My Profile Information</span>
        <div className='flex flex-col mx-[4.375rem] my-[2.75rem] space-y-[3.75rem] text-[white]'>
            <div>
                <span className='text-[1.5rem] font-bold'>Mandatory</span>
                <Form fluid className='mt-[2.5rem] flex flex-wrap'>
                    <Form.Group controlId="firstname" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>First Name</Form.ControlLabel>
                        <Form.Control name="firstname" placeholder='John' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="lastname" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Last Name</Form.ControlLabel>
                        <Form.Control name="lastname" placeholder='Doe' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="email" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" type='email' placeholder='john.doe@example.com' 
                            className='flex items-center h-[3.75rem]' 
                        />
                        <Form.HelpText tooltip /> Click to view the privacy policy
                    </Form.Group>
                </Form>
            </div>
            <div>
                <span className='text-[1.5rem] font-bold'>Optional</span>
                <Form fluid className='mt-[2.5rem] flex flex-wrap' formValue={formValue} onChange={setFormValue}>
                    <Form.Group controlId="mobile" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Mobile Phone</Form.ControlLabel>
                        <Form.Control name="mobile" type='mobile' placeholder='+12345678912' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="gender" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Gender</Form.ControlLabel>
                        <InputPicker name="gender" placeholder='Select Gender' data={genderData}
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="birthday" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Date of Birth</Form.ControlLabel>
                        <DatePicker name="birthday" placeholder='Select date of birth'
                            className='flex items-center !h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="language" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Language</Form.ControlLabel>
                        <InputPicker name="language" placeholder='Select Language' data={langData}
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="address" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Address</Form.ControlLabel>
                        <Form.Control name="address" placeholder='Ragnhilds vei 97' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="postcode" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Postcode</Form.ControlLabel>
                        <Form.Control name="postcode" placeholder='43111' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="city" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>City/District</Form.ControlLabel>
                        <Form.Control name="city" placeholder='HommersÅk' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <Form.Group controlId="municipality" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Municipality</Form.ControlLabel>
                        <Form.Control name="municipality" placeholder='Oslo' 
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                    <div className='w-1/2'>
                        <Form.Group controlId="country" className='w-full pr-[1.875rem]'>
                            <Form.ControlLabel>Country</Form.ControlLabel>
                            <Form.Control name="country" placeholder='Norway' 
                                className='flex items-center h-[3.75rem]' 
                            />
                        </Form.Group>

                        <Form.Group controlId="nationality" className='w-full pr-[1.875rem]'>
                            <Form.ControlLabel>Nationality</Form.ControlLabel>
                            <Form.Control name="nationality" placeholder='Norway' 
                                className='flex items-center h-[3.75rem]' 
                            />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="description" className='!w-1/2 pr-[1.875rem]'>
                        <Form.ControlLabel>Description</Form.ControlLabel>
                        <Input as="textarea" rows={10} placeholder="Bio" name="language"
                            className='flex items-center h-[3.75rem]' 
                        />
                    </Form.Group>
                </Form>
            </div>
            <div>
                <Button className='px-[1.5rem] py-[0.75rem] bg-[#C2FF00] text-[black]'>Save Information</Button>
            </div>
        </div>
    </div>
  )
}

const genderData = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    },
]
const langData = [
    {
        label: "English",
        value: "en",
    },
    {
        label: "French",
        value: "fr",
    },
    {
        label: "Norwegian",
        value: "nr",
    },
]