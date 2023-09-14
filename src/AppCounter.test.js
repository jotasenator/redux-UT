// App.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/slices/dataSlice';
import counterReducer from './redux/slices/counterSlice';

import App from './App';

// Create a new store for testing
const store = configureStore( {
    reducer: {
        data: dataReducer,
        counter: counterReducer,
    },
} );


test( 'renders App and interacts with counter', async () =>
{
    const { getByText, debug } = render(
        <Provider store={ store }>
            <App />
        </Provider>
    );

    // Test counter
    expect( getByText( 'Counter' ) ).toBeInTheDocument();
    expect( getByText( '0' ) ).toBeInTheDocument();

    fireEvent.click( getByText( 'Increment' ) );
    await waitFor( () => expect( getByText( '1' ) ).toBeInTheDocument() );

    fireEvent.click( getByText( 'Decrement' ) );
    await waitFor( () => expect( getByText( '0' ) ).toBeInTheDocument() );

    fireEvent.click( getByText( 'Increment 4' ) );
    await waitFor( () => expect( getByText( '4' ) ).toBeInTheDocument() );

    fireEvent.click( getByText( 'Decrement 5' ) );
    await waitFor( () => expect( getByText( '-1' ) ).toBeInTheDocument() );


} );
