import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
import MOCK_RES_DATA from "../mocks/mockResCard.json";
import '@testing-library/jest-dom';


it("should render RestaurantCard component with data", ()=>{
    render(
        <RestaurantCard resData={MOCK_RES_DATA}/>
    )
    const name = screen.getByText("Momoz");

    expect(name).toBeInTheDocument();

})