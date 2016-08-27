let React=require("react");
let Root=React.createClass({
    getDefaultProps(){
        return {
            Home:null,
            Menu:null,
            Welcome:null,
        }
    },
    render(){
        if(this.props.Welcome==null)
        {
            if(this.props.Home!=null)
            {
                return <div className="root">
                    <div className="aside_container">
                        {this.props.Menu}
                    </div>
                    <div className="wasabi-section_container">
                        {this.props.Home}
                    </div>
                </div>
            }
            else
            {
                return <div className="root">
                    <div className="aside_container">
                        {this.props.Menu}
                    </div>
                    <div className="wasabi-section_container">
                        {this.props.children}
                    </div>
                </div>
            }

        }
        else
        {
            return <div className="root">
                <div className="aside_container">{this.props.Menu}</div>
                <div className="wasabi-section_container">
                    <div><Link to="/home">心怡科技欢迎您,进入主页</Link></div>
                </div>
            </div>

        }

    }
})
module .exports=Root;