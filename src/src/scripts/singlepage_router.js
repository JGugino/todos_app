export class SinglePageRouter{
    pageRoutes;
    currentRoute;

    constructor(pageRoutes){
        this.pageRoutes = pageRoutes;
    }

    changeCurrentRouteByID (routeID){
        if(this.hasPageRoute(routeID, -1)){
            this.currentRoute = this.pageRoutes.find(route => route.routeID == routeID)
            return this.currentRoute;
        }
    }

    changeCurrentRouteByName (routeName){
        if(this.hasPageRoute(-1, routeName)){
            this.currentRoute = this.pageRoutes.find(route => route.routeName == routeName)
            return this.currentRoute;
        }
    }

    hasPageRoute (routeID, routeName){
        let hasRoute = false;

        this.pageRoutes.forEach((route) => {
            if (routeID != -1) {
                if (route.routeID == routeID) {
                    hasRoute = true;
                    return;
                }
                if(!hasRoute) hasRoute = false;
                return;
            } else if (routeName != -1) {
                if (route.routeName == routeName) {
                    hasRoute = true;
                    return;
                }
                if(!hasRoute) hasRoute = false;
                return;
            }
        });

        return hasRoute;
    }
}