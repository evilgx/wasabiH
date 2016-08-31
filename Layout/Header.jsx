//独立页页脚
let React =require("react");
let Header=React.createClass({
    getDefaultProps:function()
    {
        return{
            style:null,
            height:null
        }

    },
    render:function()
    {
        let style={};
        if(this.props.style!=null)
        {
            style=this.props.style;
        }

        return <header style={style}>{this.props.children}
        </header>
    }
})
module .exports=Header;