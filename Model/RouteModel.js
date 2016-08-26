/**
 * Created by wangzhiyong on 16/8/26.
 * 路由model
 */
class RouteModel{
    constructor(url="/",component=null)
    {
        this.url=url;
        this.component=component;
    }
}
exports.module=RouteModel;