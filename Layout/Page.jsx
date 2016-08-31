//create by wangzhiyong
//date:2016-08-25
//一个单页面
//
let React=require("react");
require("../sass/Layout/Page.css");
require("../sass/Layout/Header.css");
require("../sass/Layout/Footer.css");
require("../sass/Layout/Article.css");
let Header=require("./Header.jsx");
let Article=require("./Article.jsx");
let Footer=require("./Footer.jsx");
let Page=React.createClass({
    propsType:{
        active:React.PropTypes.bool,//是否激活

    },
    getDefaultProps:function() {
        return {
            active: true,
            header:null,
            footer:null,
            article:null,

        }
    },
    getInitialState:function() {
        let  height=this.setHeight(this.props);
        return{
            active:this.props.active,
            header:this.props.header,
            footer:this.props.footer,
            article:this.props.article,
            height:height
        }

    },
    setHeight:function(props) {
        let height = document.body.clientHeight;
        if (props.header != null) {

            height = height - window.rem2px(0.586666666);
        }
        if (props.footer != null) {

            height = height - window.rem2px(1.4);
        }
        return height;
    },
    componentWillReceiveProps(nextProps)
    {
        let  height=this.setHeight(nextProps);
        this.setState({
            active:nextProps.active,
            header:nextProps.header,
            footer:nextProps.footer,
            article:nextProps.article,
            height:height
        })
    },
    render :function() {

        return (<div className="wasabi-section_container">
            <section className={"wasabi-page "+(this.state.active==true?"active":"")}>
               <Header style={{display:this.props.header?"block":"none"}}>{this.props.header}</Header>
               <Article height={this.state.height} > {this.props.article}</Article>
                <Footer style={{display:this.props.footer?"block":"none"}}>{this.props.footer}</Footer>
            </section>
        </div>)
    }
})
module .exports=Page;