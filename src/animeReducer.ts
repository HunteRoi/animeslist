import { useReducer } from 'react';
import { AnimeModel } from './models';

type State = {
    animes: Array<AnimeModel>;
};

type Action = {
    payload: AnimeModel;
    type: string;
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'added': return { ...state, animes: [...state.animes, action.payload] };
        case 'modified': return { ...state, animes: state.animes.map(a => a.id !== action.payload.id ? a : action.payload) };
        case 'removed': return { ...state, animes: state.animes.filter(a => a.id !== action.payload.id) };
        default: return state;
    }
};

const INITIAL_STTE: State = {
    animes: new Array<AnimeModel>()
};

const useAnimesReducer = (): [State, React.Dispatch<Action>] => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STTE);

    return [state, dispatch];
};

export default useAnimesReducer;
