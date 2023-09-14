// dataSlice.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchData } from './dataSlice';

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

describe( 'fetchData async action creator', () =>
{
    beforeEach( () =>
    {
        moxios.install();
    } );

    afterEach( () =>
    {
        moxios.uninstall();
    } );

    it( 'dispatches fetchData/pending and fetchData/fulfilled when fetching data has been done', () =>
    {
        moxios.wait( () =>
        {
            const request = moxios.requests.mostRecent();
            request.respondWith( {
                status: 200,
                response: [ { id: 1, title: 'Test data' } ],
            } );
        } );

        const store = mockStore( { items: [], status: 'idle', error: null } );

        return store.dispatch( fetchData() ).then( () =>
        {
            // Get the actual actions
            const actualActions = store.getActions();

            // Check the type and payload of each action
            expect( actualActions[ 0 ].type ).toEqual( 'data/fetch/pending' );
            expect( actualActions[ 1 ].type ).toEqual( 'data/fetch/fulfilled' );
            expect( actualActions[ 1 ].payload ).toEqual( [ { id: 1, title: 'Test data' } ] );
        } );
    } );
} );
