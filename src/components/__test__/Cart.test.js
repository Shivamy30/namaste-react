const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react-dom/test-utils")
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import RestaurentMenu from "../RestaurantMenu"
import Cart from "../Cart"
import Header from "../Header"
import RES_MENU_MOCk_Data from "../mocks/mockResMenu.json"
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(RES_MENU_MOCk_Data)
    })
)

it("should load restaurant menu component", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
                <RestaurentMenu />
                <Cart />
            </Provider>
        </BrowserRouter>
    ))

    const accordian = screen.getByText("Gift Hamper's (5)")
    expect(accordian).toBeInTheDocument();

    fireEvent.click(accordian);
    const foodItems = screen.getAllByTestId("foodItems").length;
    expect(foodItems).toBe(5);

    const addBtns = screen.getAllByRole("button", { name: "Add" });
    const beforeClick = screen.getByText("Cart-0");
    expect(beforeClick).toBeInTheDocument();

    fireEvent.click(addBtns[0]);
    const afterFirstClick = screen.getByText("Cart-1")
    expect(afterFirstClick).toBeInTheDocument();

    const cartItemAfterFirstClick = screen.getAllByTestId("cartItems").length;
    expect(cartItemAfterFirstClick).toBe(1);

    fireEvent.click(addBtns[1]);
    const afterSecondClick = screen.getByText("Cart-2")
    expect(afterSecondClick).toBeInTheDocument();

    const cartItemsAfterSecondClick = screen.getAllByTestId("cartItems").length;
    expect(cartItemsAfterSecondClick).toBe(2);

    const clearCartBtn = screen.getByRole("button",{name:"Clear Cart"});
    fireEvent.click(clearCartBtn);
    const cartAfterClearCart = screen.getByText("your cart is empty! please visit home to add some items!!");
    expect(cartAfterClearCart).toBeInTheDocument();

})