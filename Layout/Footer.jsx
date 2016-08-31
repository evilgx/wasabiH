//独立页页脚
let React =require("react");
let Footer=React.createClass({
    getDefaultProps:function()
    {
        return{
            style:null,

        }

    },
    render:function()
    {
        let style={};
        if(this.props.style!=null)
        {
            style=this.props.style;
        }

        return <footer  style={style}>{this.props.children}
        </footer>
    }
})
module .exports=Footer;