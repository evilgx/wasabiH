//create by wangzhiyong
//date:2016-08-25
//desc 列表
let React=require("react");
let Cell =require("./Cell.jsx");
let List=React.createClass({
    PropTypes:{
        width:React.PropTypes.number,//宽度
        height:React.PropTypes.number,//高度
        selectAble:React.PropTypes.bool,// 是否显示选择，默认值 false
        detailAble:React.PropTypes.bool,//是否显示详情,默认值 false
        borderAble:React.PropTypes.bool,//是否显示表格边框，默认值 false
        foncusAble:React.PropTypes.bool,//是否显示焦点行，默认值 false
        pagination:React.PropTypes.bool,//是否分页,默认值 true
        selectChecked:React.PropTypes.bool,//选择行的时候是否同时选中
        pageIndex:React.PropTypes.number,//当前页号
        pageSize:React.PropTypes.number,//分页大小，默认20
        sortName:React.PropTypes.string,//排序字段,
        sortOrder:React.PropTypes.oneOf([
            "asc",
            "desc",
        ]),//排序方式,默认asc,
        keyField:React.PropTypes.string,//关键字段
        model:React.PropTypes.array.isRequired,//表头设置
        total:React.PropTypes.number,// 总条目数，默认为 0
        data:React.PropTypes.array,//当前页数据（json）

        url:React.PropTypes.string,//ajax地址
        backSource:React.PropTypes.string,//ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
        totalSource:React.PropTypes.string,//ajax的返回的数据源中哪个属性作为总记录数,为null时直接后台返回的数据中的total
        params:React.PropTypes.object,//查询条件
        onClick:React.PropTypes.func,//单击事件
        onDoubleClick:React.PropTypes.func,//双击事件
        onChecked:React.PropTypes.func,//表格中有一行被选中
        detailHandler:React.PropTypes.func,//展示详情的函数，父组件一定要有返回值,返回详情组件
        footer:React.PropTypes.array,//页脚,
        footerSource:React.PropTypes.string,//页脚数据源,
    },
    getDefaultProps:function(){
        return{
            width:document.body.clientWidth,
            height:null,
            selectAble:false,
            detailAble:false,
            foncusAble:false,
            borderAble:false,
            pagination:true,
            pageIndex:1,
            pageSize:20,
            sortName:"id",
            sortOrder:"asc",
            keyField:"id",
            model:[],
            total:0,
            data:[],
            updateHandler:null,
            detailHandler:null,
            url:null,//
            backSource:"data.data",//
            totalSource:"data.total",//
            params:null,
            footer:null,//页脚
            footerSource:"data.footer",//页脚数据源
            onDoubleClick:null,
            selectChecked:false,
            onChecked:null,

        }
    },
    getInitialState:function() {
        var data=[];
        if(this.props.data instanceof  Array)
        {
            data=this.props.data;
        }
        return {
            url:this.props.url,
            params:unit.clone( this.props.params),//这里一定要复制
            pageIndex:this.props.pageIndex,
            pageSize:this.props.pageSize,
            sortName:this.props.sortName,
            sortOrder:this.props.sortOrder,
            data:(this.props.pagination==true? data.slice(0,this.props.pageSize):data),//只只保留当前的数据
            checkedData:new Map(),
            detailView:null,//详情行,
            detailIndex:null,//显示详情的行下标
            total:this.props.total,//总记录数
            loading:(this.props.url&&this.props.url!="")?true:false,//显示正在加载图示
            footer:this.props.footer,
            tdwidth:null,//用于计算宽度
        }
    },
    shouldComponentUpdate:function(nextProps,nextState) {
        return true;
    },
    componentWillReceiveProps:function(nextProps) {
        if(nextProps.url&&nextProps.url!="") {
            //如果存在url
            if (this.shouldUpdate(nextProps.url,this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder, nextProps.params)) {
                //先判断是否有条件变化，没有则不更新
                this.updateHandler(nextProps.url,this.state.pageSize, this.state.pageIndex, this.state.sortName, this.state.sortOrder, nextProps.params);
            }
        }else
        {
            //没有url时，自定义更新事件
            if(nextProps.data!=null&&nextProps.data!=undefined&&nextProps.data instanceof Array)
            {
                this.setState({
                    data:(this.props.pagination==true? nextProps.data.slice(0,nextProps.pageSize):nextProps.data),
                    total:nextProps.total,
                    pageIndex:nextProps.pageIndex,
                    pageSize:nextProps.pageSize,
                    sortName:this.props.sortName,
                    sortOrder:nextProps.sortOrder,
                    loading:false,
                })
            }
        }
    },
    componentDidMount:function(){
        if(this.state.url&&this.state.url!="")
        {//如果存在url,
            this.updateHandler(this.state.url,this.state.pageSize,this.state.pageIndex,this.state.sortName,this.state.sortOrder)
        }
    },
    updateHandler:function(url,pageSize,pageIndex,sortName,sortOrder,params){
        //更新事件

        if(url==undefined)
        {
            url=this.state.url;
        }
        if(url&&url!=="") {

            this.setState({
                loading:true,
            })

            var actualParams={};

            if(!params&&this.state.params&&typeof this.state.params =="object")
            {
                actualParams=unit.clone(this.state.params);
            }
            else
            {
                if(this.props.pagination==true) {
                    actualParams.data = params;

                }
                else
                {
                    actualParams=params;
                }
            }

            if(this.props.pagination==true)
            {
                actualParams.pageSize=pageSize;
                actualParams.pageIndex=pageIndex;
                actualParams.sortName=sortName;
                actualParams.sortOrder=sortOrder;
            }
            else
            {
            }
            var fetchmodel=new FetchModel(url,this.loadSuccess.bind(this,url,pageSize,pageIndex,sortName,sortOrder,params),actualParams,this.loadError);
            unit.fetch.post(fetchmodel);
        }
        else {
            if (this.props.updateHandler != null) {
                this.setState({
                    loading:true,
                });
                this.props.updateHandler(pageSize, pageIndex, sortName, sortOrder);
            }
        }

    },
    loadSuccess:function(url,pageSize,pageIndex,sortName,sortOrder,params,data) {//数据加载成功
        var dataSource;
        var totalSource;
        var footerSource;
        if(this.props.backSource&&this.props.backSource!="") {
            if(this.props.pagination==false&&this.props.backSource=="data.data")
            {
                dataSource= unit.getSource( data,"data");
            }else {
                dataSource= unit.getSource( data,this.props.backSource);

            }

        }
        else {
            dataSource=data;
        }
        if(this.props.pagination&&this.props.totalSource&&this.props.totalSource!="") {

            totalSource=unit.getSource( data,this.props.totalSource);
        }
        else {
            totalSource=data.total;
        }
        if(this.props.footerSource&&this.props.footerSource!="")
        {
            footerSource= unit.getSource( data,this.props.footerSource);
        }
        if(dataSource&& dataSource instanceof  Array &&dataSource.length==0&&totalSource>0&&pageIndex!=1)
        {
            //有总记录，没有当前记录数,不是第一页，继续查询转到上一页
            this.updateHandler(url,pageSize,pageIndex-1,sortName,sortOrder,params);
        }
        this.setState({
            url:url,
            pageSize:pageSize,
            params:unit.clone(params),//这里一定要复制
            pageIndex:pageIndex,
            sortName:sortName,
            sortOrder:sortOrder,
            data: (this.props.pagination==true? dataSource.slice(0,this.props.pageSize):dataSource),
            total:totalSource,
            footer:footerSource,
            loading:false,
            checkedData:this.clearCheck==true?new Map():this.state.checkedData
        })
        if(this.clearCheck==true)
        {
            this.clearCheck=false;
        }
    },
    loadError:function(errorCode,message) {//查询失败
        //Message. alert(message);
        alert(message);//TODO
        this.setState({
            loading:false,
        })
    },
    reload:function() {//重新刷新数据
        this.clearCheck=true;//重载时清空选中的
        this.updateHandler(this.state.url,this.state.pageSize, 1, this.state.sortName, this.state.sortOrder, this.state.params);
    },
    clearData:function() {//清空数据
        this.setState({
            data:[]
        });
    },
    shouldUpdate:function(url,pageSize,pageIndex,sortName,sortOrder,params) {//判断是否更新
        let isupdate=false;
        if(url!=this.state.url)
        {
            isupdate=true;
            return isupdate;
        }
        if(pageSize!=this.state.pageSize)
        {
            isupdate=true;
            return isupdate;
        }
        if(pageIndex!=this.state.pageIndex)
        {
            isupdate=true;
            return isupdate;
        }
        if(sortName!=this.state.sortName)
        {
            isupdate=true;
            return isupdate;
        }
        if(sortOrder!=this.state.sortOrder)
        {
            isupdate=true;
            return isupdate;
        }
        if((params&&!this.state.params)||(params&&this.state.params&&Object.keys(params).length!=Object.keys(this.state.params).length))
        {//新的参数不为空，旧参数为空， 新参数不空，旧参数不为空，但长度不一样
            isupdate=true;
            return isupdate;
        }
        for(var par in params)
        {
            try {


                if (params[par] == this.state.params[par]) {
                    continue;
                }
                else {
                    isupdate = true;
                    return isupdate;
                }
            }catch (e)
            {
                isupdate = true;
                return isupdate;
            }

        }
    },
    getKey:function (index) {
        //获取指定行的关键字
        let key = this.state.pageIndex.toString() + "-" + index.toString();//默认用序号作为关键字
        if (this.state.data[index][this.props.keyField]) {
            key = this.state.data[index][this.props.keyField];//如果能获取关键字段，则用关键字段
        }

        return key;
    },
    onChecked:function(index,value) {//选中事件
        let checkedData=(this.state.checkedData);//已经选中的行
        let key=this.getKey(index);//获取关键字
        if(value&&value!=""){
            checkedData.set(key,this.state.data[index]);
        }else
        {
            checkedData.delete(key,this.state.data[index]);
        }
        this.setState({
            checkedData:checkedData
        })
        if(this.props.onChecked!=null)
        {
            var data=[];
            for (let value of checkedData.values()) {
                data.push(value);
            }
            this.props.onChecked(data);
        }
    },
    onMouseDown:function(index) {
        //一定要用鼠标按下事件,不保存在状态值中
        this.setState({
            focusIndex:index
        })
    },
    onClick:function(rowData,rowIndex){
        if(this.props.selectChecked==true) {
            let key=this.getKey(rowIndex);//获取关键字
            if(this.state.checkedData.has(key)) {
                this.onChecked(rowIndex, "");
            }
            else {
                this.onChecked(rowIndex,key);
            }
        }
        if(this.props.onClick!=null)
        {
            this.props.onClick(rowIndex,rowData);
        }

    },
    getFocusIndex:function() {
        return this.state.focusIndex;
    },
    getFocusRowData:function(index) {
        if(index!=null&&index!=undefined)
        {

        }
        else
        {
            index=this.state.focusIndex;
        }
        return this.state.data[index];
    },
    checkCurrentPageCheckedAll:function() {//判断当前页是否全部选中
        if(this.state.data instanceof Array )
        {

        }
        else
        {
            return ;
        }
        let length=this.state.data.length;
        if(length==0)
        {
            return  false;//如果没有数据，则不判断，直接返回
        }
        var ischeckall=true;
        for(let i=0;i<length;i++)
        {
            if(!this.state.checkedData.has(this.getKey(i)))
            {
                ischeckall=false;
                break;
            }
        }
        return ischeckall;
    },
    checkedAllHandler:function(value){
        if(this.state.data instanceof  Array)
        {

        }
        else
        {
            return;
        }
        let length=this.state.data.length;
        let checkedData=this.state.checkedData;
        for(let i=0;i<length;i++)
        {
            let key=this.getKey(i);
            if(value=="yes") {
                if (!checkedData.has(key)) {
                    checkedData.set(key, this.state.data[i]);//添加
                }
            }
            else {
                if (checkedData.has(key)) {
                    checkedData.delete(key, this.state.data[i]);//删除
                }
            }
        }


        this.setState({checkedData:checkedData});
        if(this.props.onChecked!=null)
        {
            var data=[];
            for (let value of checkedData.values()) {
                data.push(value);
            }
            this.props.onChecked(data);
        }

    },
    getChecked:function() {
        //获取选中的行数据
        var data=[];
        for (let value of this.state.checkedData.values()) {
            data.push(value);
        }
        return data;
    },
    getFooterData:function() {//获取得页脚的统计值
        return [];
    },
    updateRow:function(rowIndex,rowData) {//更新某一行数据
        if(rowIndex>=0&&rowIndex<this.state.pageSize) {
            var newData = this.state.data;
            newData[rowIndex] = rowData;
            this.setState({data:newData});
        }

    },
    addRow:function(rowData) {//添加一行
        let newData=this.state.data;
        newData.push(rowData);
        this.setState({
            data:newData
        });
    },
    detailHandler:function(rowIndex, rowData) {//执行显示详情功能
        var key=this.getKey(rowIndex);
        if(key==this.state.detailIndex)
        {
            this.setState({
                detailIndex: null,
                detailView: null,
            })
        }
        else {
            if (this.props.detailHandler != null) {
                var detail = this.props.detailHandler(rowData);
                var colSpan = this.props.model.length;


                if (this.props.selectAble == true) {
                    colSpan++;
                }
                //TODO 待定
                //this.setState({
                //    detailIndex: key,
                //    detailView: <tr key={key+"detail"}>
                //        <td colSpan={colSpan}><div className="wasabi-detail">{detail}</div></td>
                //    </tr>,
                //})
            }
        }
    },
    render:function()
    {

        var Cells=[];
        if(this.state.data instanceof  Array)
        {

            this.state.data.map((item,index)=>{
                Cells.push(<Cell key={"cell"+index} data={item} model={this.props.model}></Cell>)
            })

             return <ul className="wasabi-data-ul">
                 {
                     Cells
                 }
             </ul>
        }
        else {
            return null;
        }
    }
})
exports.module=List;