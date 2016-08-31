let React=require("react");
let Article=React.createClass({
    getDefaultProps:function()
    {
        return{
            style:null,
            height:null
        }

    },
    render:function() {
        let style={};
        if(this.props.style!=null)
        {
            style=this.props.style;
        }
        if(this.props.height!=null)
        {
            style.height=this.props.height;
        }
        return <article style={style} className="article">{this.props.children}</article>
    }
})
module .exports=Article;