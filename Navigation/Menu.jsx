/**
 * Created by jiaxuanliang on 2016/8/19.
 */
require('../sass/menu.scss');

var React = require('react');

var Menu = React.createClass({
    getInitialState:function(){
        return {
            data:this.props.data,
            activeIndex:0,//一级菜单选中索引
            dataSource:this.props.dataSource,//二级菜单数据源
            textField:this.props.textField,//标题字段
            linkField:this.props.linkField,//链接字段
        };
    },
    getDefaultProps:function(){
        return {
            dataSource:"data",//二级菜单数据源
            textField:"title",//标题字段
            linkField:"url"//链接字段
        }
    },
    propTypes:{
        data:React.PropTypes.array.isRequired,
        dataSource:React.PropTypes.string,
        textField:React.PropTypes.string,
        linkField:React.PropTypes.string

    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            data:nextProps.data
        });
    },
    handleOptionTap:function(index){
        this.setState({
            activeIndex:index
        });
    },
    //渲染一级菜单
    renderLeftData:function(){
        return this.state.data.map(function(item,index){
            var className = "option";

            if(index===this.state.activeIndex){
                className += " selected";
            }

            return (
                <a href="#" key={"options"+index} className={className} onTouchStart={this.handleOptionTap.bind(this,index)}>{item.name}</a>
            );

        }.bind(this));
    },
    //渲染二级菜单
    renderRightData:function(){
        var dataSource = this.state.dataSource;
        var data = this.state.data[this.state.activeIndex];
        if(dataSource.indexOf('.')>=0){
            var arr  =dataSource.split('.');
            arr.forEach((item,index)=>{
                data = data[item];
            })
        }else{
            data = data[dataSource];
        }

        return data.map(function(item,index){
            return (
                <a href={item[this.state.linkField]} key={"form"+index} className="option">{item[this.state.textField]}</a>
            );
        }.bind(this));
    },
    render:function () {
        if(this.state.data.length<=0) return null;

        return (
            <div className="menu-container">
                <div className="left">{this.renderLeftData()}</div>
                <div className="right">{this.renderRightData()}</div>
            </div>
        );
    }
});

module.exports = Menu;