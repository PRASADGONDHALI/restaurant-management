import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';
import { search } from '../../services/Apis';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const  response  = await search(values.keyword);
            setValues({ ...values, results: response });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, keyword: e.target.value });
    };

    return (
        <div>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={handleChange}
                />
                <Button variant="dark" type="submit" className='mx-2'>Search</Button>
            </Form>
        </div>
    );
};

export default SearchInput;
