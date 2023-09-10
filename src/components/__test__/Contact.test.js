
import { screen, render } from '@testing-library/react';
import Contact from '../Contact';
import '@testing-library/jest-dom';

test('should lead headings', ()=>{
    render(< Contact />);

    const heading = screen.getByRole("heading");

    // console.log(heading);
    expect(heading).toBeInTheDocument();
    
})