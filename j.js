import React, { useContext, useState } from 'react';
import { FormDataContext } from './FormDataContext';

const MyFormComponent = () => {
  const { handleFormData } = useContext(FormDataContext);
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormData(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormComponent;


// dadadsdadddadadaddadd
import React from 'react';
import { FormDataProvider } from './FormDataContext';
import MyFormComponent from './MyFormComponent';

const App = () => {
  return (
    <FormDataProvider>
      <MyFormComponent />
    </FormDataProvider>
  );
};

export default App;

