import React, {useState} from 'react';
import styled from '@emotion/styled';
import { getYearDifference, calculateBrand, calculatePlan } from '../helpers'

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%100px;
    text-align: center;
`;

const Form = ({setSummary, setLoading}) => {

    const [data, setData] = useState({
        brand: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState(false);

    const {brand, year, plan} = data;

    const getData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const submitInsurance = e => {
        e.preventDefault();
        if(brand.trim() === '' || year.trim() === '' || plan.trim() === ''){
            setError(true)
            return;
        }

        setError(false)

        // initial price 2000

        let result = 2000;

        const difference = getYearDifference(year);

        //discounts 3% per year of antiquity
        result -= (( difference * 3 ) * result) / 100;

        // american 15%, asian 5%, european 30%
        result = calculateBrand(brand) * result;
        
        result = parseFloat( calculatePlan(plan) * result ).toFixed(2);

        setLoading(true);

        //Empties the current quote, preventing the summary to show up older information
        setSummary({
            quote: '',
            data: {
                brand: '',
                year: '',
                plan: ''
            }
        })

        setTimeout( () => {
            setLoading(false);
            setSummary({
                quote: result,
                data
            })
        }, 2000)
    }

    return ( 
        <form
            onSubmit={submitInsurance}
        >

            { error ? <Error>Every field must be completed.</Error> : null}

            <Field>
                <Label>Brand</Label>
                <Select
                    name='brand'
                    value={brand}
                    onChange={getData}
                >
                    <option value=''>Select a brand</option>
                    <option value='american' >American</option>
                    <option value='european'>European</option>
                    <option value='asian'>Asiatic</option>
                </Select>
            </Field>

            <Field>
                <Label>Year</Label>
                <Select
                    name='year'
                    value={year}
                    onChange={getData}
                >
                    <option value="">Select the year</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio
                    type='radio'
                    name='plan'
                    value='basic'
                    checked={plan === 'basic'}
                    onChange={getData}
                />Basic
                <InputRadio
                    type='radio'
                    name='plan'
                    value='full'
                    checked={plan ==='full'}
                    onChange={getData}
                />Full
            </Field>

            <Button type='submit'>Quote</Button>
        </form>
     );
}
 
export default Form;