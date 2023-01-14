import axios from "axios";
import { useRouter } from "next/router";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  SelectPicker,
  DatePicker,
  Button,
  Input,
  Notification,
  useToaster,
} from "rsuite";
import { useAppSelector } from "store/hook";
import { login } from "store/slices/authSlice";
import countries from 'utils/counties'

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const toaster = useToaster();
  const router = useRouter();

  const { firstname, lastname, image, access_token } = useAppSelector(
    (state) => state.auth
  );
  const [mandatoryValue, setMandatoryValue] = useState({ firstname, lastname });
  const [optionalValue, setOptionalValue] = useState({});

  const notification = ({ title, description, type }) => (
    <Notification type={type} header={title} closable>
      {description}
    </Notification>
  );

  const handleBack = (evt) => {
    evt.preventDefault();
    router.back();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {
      ...mandatoryValue,
      ...optionalValue,
    };

    axios
      .put(`/api/profile`, data)
      .then((data) => {
        dispatch(login({ access_token: access_token, profile: data }));
        toaster.push(
          notification({
            title: "Profile",
            description: "Updated profile successfully",
            type: "success",
          }),
          {
            placement: "topEnd",
          }
        );
        router.back();
      })
      .catch((err) => {
        toaster.push(
          notification({
            title: "Profile",
            description: "Could not update profile details",
            type: "error",
          }),
          {
            placement: "topEnd",
          }
        );
      });
  };

  return (
    <div className="px-[8.5rem] flex flex-col py-[5rem] bg-grey-dark">
      {/* <span className='font-bold px-[4.375rem] py-[2.5rem] rounded-t-[1rem] text-[#1D1829] text-[2rem] bg-[#c2ff00]'>My Profile Information</span> */}
        <div className='flex flex-col px-[4.375rem] py-[2.75rem] rounded-b-[1rem] space-y-[3.75rem] text-[white] bg-dark border-grey border'>
        <div>
          <span className="text-[1.5rem] font-bold">Mandatory</span>
          <Mandatory
            formValue={mandatoryValue}
            setFormValue={setMandatoryValue}
          />
        </div>
        <div>
          <span className="text-[1.5rem] font-bold">Optional</span>
          <Optional formValue={optionalValue} setFormValue={setOptionalValue} />
        </div>
        <div className="flex space-x-2">
          <Button
            className="px-[1.5rem] py-[0.75rem] bg-green text-[black]"
            onClick={handleSubmit}
          >
            Save Information
          </Button>
          <Button
            className="px-[1.5rem] py-[0.75rem] bg-grey text-[black]"
            onClick={handleBack}
          >
            Back to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

const Mandatory = ({ formValue, setFormValue }) => (
  <Form
    fluid
    className="mt-[2.5rem] flex flex-wrap"
    onChange={setFormValue}
    formValue={formValue}
  >
    <Form.Group controlId="firstname" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>First Name</Form.ControlLabel>
      <Form.Control
        name="firstname"
        placeholder="John"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="lastname" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Last Name</Form.ControlLabel>
      <Form.Control
        name="lastname"
        placeholder="Doe"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
  </Form>
);
const Optional = ({ formValue, setFormValue }) => (
  <Form fluid className="mt-[2.5rem] flex flex-wrap">
    <Form.Group controlId="mobile" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Mobile Phone</Form.ControlLabel>
      <Form.Control
        name="mobile"
        type="mobile"
        placeholder="+12345678912"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="gender" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Gender</Form.ControlLabel>
      <SelectPicker
        size="lg"
        name="gender"
        placeholder="Select Gender"
        data={genderData}
        searchable={false}
        className="flex items-center !h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="birthday" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Date of Birth</Form.ControlLabel>
      <DatePicker
        name="birthday"
        placeholder="Select date of birth"
        className="flex items-center !h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="language" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Language</Form.ControlLabel>
      <SelectPicker
        name="language"
        placeholder="Select Language"
        data={langData}
        searchable={false}
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="address" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Address</Form.ControlLabel>
      <Form.Control
        name="address"
        placeholder="Ragnhilds vei 97"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="postcode" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Postcode</Form.ControlLabel>
      <Form.Control
        name="postcode"
        placeholder="43111"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="city" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>City/District</Form.ControlLabel>
      <Form.Control
        name="city"
        placeholder="HommersÅk"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <Form.Group controlId="municipality" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Municipality</Form.ControlLabel>
      <Form.Control
        name="municipality"
        placeholder="Oslo"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
    <div className="w-1/2">
      <Form.Group controlId="country" className="w-full pr-[1.875rem]">
        <Form.ControlLabel>Country</Form.ControlLabel>
        <SelectPicker
          name="country"
          placeholder="Select Country"
          data={countries}
          searchable={false}
          className="flex items-center h-[3.75rem] placeholder-grey7"
        />
      </Form.Group>
      <Form.Group controlId="nationality" className="w-full pr-[1.875rem]">
        <Form.ControlLabel>Nationality</Form.ControlLabel>
        <SelectPicker
          name="nationality"
          placeholder="Norway"
          data={countries}
          searchable={false}
          className="flex items-center h-[3.75rem] placeholder-grey7"
        />
      </Form.Group>
    </div>
    <Form.Group controlId="description" className="!w-1/2 pr-[1.875rem]">
      <Form.ControlLabel>Description</Form.ControlLabel>
      <Input
        as="textarea"
        rows={7}
        placeholder="Bio"
        name="language"
        className="flex items-center h-[3.75rem] placeholder-grey7"
      />
    </Form.Group>
  </Form>
);

const genderData = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];
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
];
