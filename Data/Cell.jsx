//create by wangzhiyong
//date:2016-08-25
//desc 列表单元
let React=require("react");
require("../sass/Data/Cell.css");
let Cell=React.createClass({
    propsType:{
        data:React.PropTypes.object,//本行数据
        model:React.PropTypes.object,//数据模型
       title:React.PropTypes.string,//标题
        asideText:React.PropTypes.string,//边际信息
        asideCount:React.PropTypes.number,//数字气泡
        content:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.string,React.PropTypes.func]),//内容描述
        iconCls:React.PropTypes.string,//行图标
        divider:React.PropTypes.bool,//是否为分隔栏
        onTouch:React.PropTypes.func,//单击事件
    },
    getDefaultProps:function(){
        return {
            data:null,
            model:null,
            title: "",
            asideText: null,
            asideCount: null,
            content: null,
            iconCls: null,
            divider:false,
            onTouch:null
        }
    },

     getInitialState:function() {
         return {
             data:this.props.data,
             model:this.props.model,
             title: this.props.title,
             asideText: this.props.asideText,
             asideCount: this.props.asideCount,
             Content: this.props.Content,
             iconCls: this.props.iconCls,
             subCotent:this.props.subCotent,
         }
     },
    componentWillReceiveProps:function(nextProps) {
        this.setState({
            data:nextProps.data,
            model:nextProps.model,
            title: nextProps.title,
            asideText: nextProps.asideText,
            asideCount: nextProps.asideCount,
            Content: nextProps.Content,
            iconCls: nextProps.iconCls,
            subCotent:nextProps.subCotent,
        })
    },
    onTouchHandler:function()
    {
        if(this.props.onTouch!=null)
        {
            this.props.onTouch();
        }
    },
    render:function()
    {
        var title=this.state.title;
        var dividerasideText=this.state.asideText;
        var asideCount=this.state.asideCount;
        var content=this.state.content;
        var divider=this.state.divider;
        var iconCls=this.state.iconCls;
        if(this.state.model!=null)
        {
            for(var prop in this.state.model){
                switch (prop)
                {
                    case "title":
                        if(typeof  this.state.model[prop] ==="string")
                        {
                            title=this.state.data[this.state.model[prop]];
                        }
                        if(typeof  this.state.model[prop] ==="number")
                        {
                            title=this.state.data[this.state.model[prop]];
                        }
                        else   if(typeof  this.state.model[prop] ==="function"){
                            title=this.state.model[prop](this.state.data);
                        }
                        break ;
                    case "asideText":
                        asideText=this.state.data[this.state.model[prop]];
                        break;
                    case "asideCount":
                        asideCount=this.state.data[this.state.model[prop]];
                        break;
                    case "content":
                        if(typeof  this.state.model[prop] ==="string")
                        {
                            content=this.state.data[this.state.model[prop]];
                        }
                        if(typeof  this.state.model[prop] ==="number")
                        {
                            content=this.state.data[this.state.model[prop]];
                        }
                        else   if(typeof  this.state.model[prop] ==="function"){
                            content=this.state.model[prop](this.state.data);
                        }
                        break ;
                    case "divider":
                        divider=this.state.data[this.state.model[prop]];
                        break;
                    case "iconCls":
                        iconCls=this.state.data[this.state.model[prop]];
                        break;
                }
            }
        }

        if (divider == true) {
            return <li className="wasabi-data-li divider">{title}</li>
        }
        else {

            return <li className="wasabi-data-li" onTouch={this.onTouchHandler}>
                <div className="title">{title}</div>
                <div className="aside" style{{display:asideText!=null?"inline-block":"none"}}>{asideText}</div>
                <div className="content">
                    {
                        content
                    }
                </div>

            </li>
        }
    }
})