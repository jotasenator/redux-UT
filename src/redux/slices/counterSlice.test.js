import counterReducer, {
    increment,
    decrement,
    incrementByAmount,
    decrementByAmount,
} from "./counterSlice";

describe( "Counter Reducer", () =>
{
    it( "should handle initial state", () =>
    {
        const initialState = { value: 0 };
        expect( counterReducer( undefined, {} ) ).toEqual( initialState );
    } );

    it( "should handle increment", () =>
    {
        const initialState = { value: 0 };
        const nextState = counterReducer( initialState, increment() );
        expect( nextState.value ).toEqual( 1 );
    } );

    it( "should handle decrement", () =>
    {
        const initialState = { value: 2 };
        const nextState = counterReducer( initialState, decrement() );
        expect( nextState.value ).toEqual( 1 );
    } );

    it( "should handle incrementByAmount", () =>
    {
        const initialState = { value: 3 };
        const nextState = counterReducer( initialState, incrementByAmount( 2 ) );
        expect( nextState.value ).toEqual( 5 );
    } );

    it( "should handle decrementByAmount", () =>
    {
        const initialState = { value: 6 };
        const nextState = counterReducer( initialState, decrementByAmount( 3 ) );
        expect( nextState.value ).toEqual( 3 );
    } );
} );
