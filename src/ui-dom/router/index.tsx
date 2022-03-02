import { Route, Navigate } from 'react-router-dom';

export function RenderRouterPage  (routes: any[]) {
    return routes.map((r, i) => {
        if (undefined !== r.routes) {
            return <Route key={r.path} path={r.path}>{RenderRouterPage(r.routes)}</Route>
        } else {
            const result = [];
            if (r.redirect) {
                result.push(<Route key={r.path} path={r.path} element={<Navigate replace to={r.redirect} />}></Route>)
            } else {
                result.push(<Route key={r.path} path={r.path} element={<r.component />}></Route>)
            }
            return result;
        }
    })
}