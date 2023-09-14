import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // You may need to install this package
import App from "./App";

// Create a mock Redux store
const mockStore = configureStore( [] );

describe( "App Component", () =>
{
    let store;

    beforeEach( () =>
    {
        // Initialize a mock store with the initial state you want to test
        store = mockStore( {
            data: {
                items: [
                    { id: 1, title: "Item 1" },
                    { id: 2, title: "Item 2" },
                ],
                status: "succeeded",
                error: null,
            },
            counter: {
                value: 3, // Set your counter value here
            },
        } );
    } );

    it( "renders data and counter elements correctly", async () =>
    {
        const { getByText } = render(
            <Provider store={ store }>
                <App />
            </Provider>
        );

        // Check if data and counter elements are rendered
        expect( getByText( "Counter" ) ).toBeInTheDocument();
        expect( getByText( "Data" ) ).toBeInTheDocument();
        expect( getByText( "Increment" ) ).toBeInTheDocument();
        expect( getByText( "Decrement" ) ).toBeInTheDocument();
        expect( getByText( "Increment 4" ) ).toBeInTheDocument();
        expect( getByText( "Decrement 5" ) ).toBeInTheDocument();

        // Check if the data is displayed
        await waitFor( () =>
        {
            expect( getByText( "Item 1" ) ).toBeInTheDocument();
            expect( getByText( "Item 2" ) ).toBeInTheDocument();
        } );

        // Check if the counter value is displayed
        expect( getByText( "3" ) ).toBeInTheDocument();
    } );

    it( "handles increment and decrement correctly", () =>
    {
        const { getByText } = render(
            <Provider store={ store }>
                <App />
            </Provider>
        );

        // Click the Increment button
        fireEvent.click( getByText( "Increment" ) );
        expect( store.getActions() ).toEqual( [ { type: "counter/increment" } ] );

        // Click the Decrement button
        fireEvent.click( getByText( "Decrement" ) );
        expect( store.getActions() ).toEqual( [ { type: "counter/increment" }, { type: "counter/decrement" } ] );
    } );
} );
