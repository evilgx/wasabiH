/**
 * Created by wangzhiyong on 16/8/16.
 */

var dpr;//设备像素比
var remBase;//rem表示基准值
var intialScale;//缩放级别
var docEl = document.documentElement;//页面
var fontEl = document.createElement('style');//创建style
var metaEl = document.querySelector('meta[name="viewport"]');//meta标签

dpr = window.devicePixelRatio || 1;//remBase
intialScale = 1 / dpr;//设备像素比
remBase = docEl.clientWidth * dpr / 10;//rem表示基准值
// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + intialScale + ',maximum-scale=' + intialScale + ',minimum-scale=' + intialScale + ',user-scalable=no');
// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);
// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + remBase + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem= function(v) {
    v = parseFloat(v);
    return v / rem;
};
window.dpr = dpr;
window.remBase = remBase;



exports.Button = require('./Buttons/Button.jsx');//
exports.LinkButton = require('./Buttons/LinkButton.jsx');//
exports.Cell = require('./Data/Cell.jsx');//
exports.List = require('./Data/List.jsx');//


exports.App = require('./Layout/App.jsx');//

exports.Article = require('./Layout/Article.jsx');//
exports.Footer = require('./Layout/Footer.jsx');//
exports.Header = require('./Layout/Header.jsx');//
exports.Page = require('./Layout/Page.jsx');//
exports.Progress = require('./Layout/Progress.jsx');//
exports.ActionSheet = require('./Navigation/ActionSheet.jsx');//
exports.Navbar = require('./Navigation/Navbar.jsx');//
exports.Tabs = require('./Navigation/Tabs.jsx');//
exports.TabModel = require('./Model/TabModel.js');//
