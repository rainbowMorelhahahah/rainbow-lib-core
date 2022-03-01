import {
    useNavigate,
    useParams as useReactRouteParams,
    useSearchParams
} from 'react-router-dom';

function useHistory() {
    const history = useNavigate();

    function go(page: number) {
        return history(page);
    }

    function goBack() {
        return go(-1);
    }

    function goForward() {
        return go(1);
    }

    function push(route: string, query?: any) {
        let uri = "";
        if (query) {
            uri = `${route}?${new URLSearchParams(query)}`
        }
        history(uri)
    }

    function replace(route: string) {
        history(route, { replace: true });
    }

    const params = useParams();
    const query = useQuery();

    function useParams<Q>(): Q {
        let result: any;
        result = useReactRouteParams();
        return result as Q;
    }

    function useQuery<T>(): T {
        const [query] = useSearchParams();
        let result: any = {};
        for (const entiry of query.entries()) {
            const [key, value] = entiry;
            result = Object.assign(result, { [key]: value });
        }
        return result as T;
    }

    return { history, go, goBack, push, replace, params, query, goForward };

}

export { useHistory };