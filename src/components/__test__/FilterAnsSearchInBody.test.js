import { fireEvent, render, screen } from "@testing-library/react"
import Body from "../Body"
import { act } from "react-dom/test-utils";
import BODY_MOCK_DATA from "../mocks/mockBody.json";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(BODY_MOCK_DATA);
        }
    })
})
it("should return body component with search ", async () => {
    await act(async () =>
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        ))
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    
    expect(cardsBeforeSearch.length).toBe(20);

    const searchBtn = screen.getByRole("button",{name:"Search"});
    const searchInp = screen.getByTestId("searchInput");
    fireEvent.change(searchInp, {target:{value:"burger"}});
    fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard");

    expect(cardsAfterSearch.length).toBe(2);
})

it("should return body component with top Rated filter ", async () => {
    await act(async () =>
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        ))
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    
    expect(cardsBeforeSearch.length).toBe(20);

    const filterBtm = screen.getByRole("button",{name:"Top Rated Restaurants"});
   
    fireEvent.click(filterBtm);

    const cardsAfterSearch = screen.getAllByTestId("resCard");

    expect(cardsAfterSearch.length).toBe(16);
})