import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CategoryForm = ({ handleSubmit,value,setValue }) => { // Destructure props correctly
  return (
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Enter New Category"
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      </Form.Group>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CategoryForm;
