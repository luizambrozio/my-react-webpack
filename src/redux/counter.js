const PLUS_ONE = Symbol("PLUS_ONE");
const MINUS_ONE = Symbol("MINUS_ONE");

export const plusOne = () => ( { type: PLUS_ONE } );
export const minusOne = () => ( { type: MINUS_ONE } );

const initialState = {
    counter: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PLUS_ONE:
            return {...state, counter: state.counter + 1}
        case MINUS_ONE:
            return {...state, counter: state.counter - 1}
        default:
            return state;
    }
}