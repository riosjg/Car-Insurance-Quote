import React from 'react';
import styled from '@emotion/styled';
import {firstCapital} from '../helpers'

const SummaryContainer = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: #fff;
    margin-top: 1rem;
`;

const Summary = ({data}) => {
    const {brand, year, plan} = data

    if (brand === '' || year === '' || plan === ''){
        console.log("returning null")
        return null;
    }

    return ( 
        <SummaryContainer>
            <h2>Quote Summary</h2>
            <ul>
                <li>Brand: { firstCapital(brand)}</li>
                <li>Year: {firstCapital(year)}</li>
                <li>Plan: {firstCapital(plan)}</li>
            </ul>
        </SummaryContainer>
     );
}
 
export default Summary;