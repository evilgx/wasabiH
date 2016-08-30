let React=require("react");
let Article=React.createClass({
    render:function() {
        return <article className="article">{this.props.children}</article>
    }
})
module .exports=Article;