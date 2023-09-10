import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import appStore from "../../utils/appStore"
import Header from "../Header"
import '@testing-library/jest-dom';

it("should change to logout on click in side header",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    )
    const loginButton = screen.getByRole("button",{name:"Login"});
    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole("button",{name:"Logout"});
    expect(logoutButton).toBeInTheDocument();
});

it("should check Header loaded with cart ",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    )
    const cartItems = screen.getByText(/Cart/);
   
    expect(cartItems).toBeInTheDocument();
})