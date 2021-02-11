(this["webpackJsonptask-management-react-app"]=this["webpackJsonptask-management-react-app"]||[]).push([[0],{18:function(t,e,n){},19:function(t,e,n){},25:function(t,e,n){},26:function(t,e,n){"use strict";n.r(e);var s=n(0),a=n(2),i=n.n(a),o=n(12),c=n.n(o),r=(n(18),n(3)),l=n(4),u=n(6),p=n(5),d=(n(19),n(8)),j=n(9),m=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(r.a)(this,n),(s=e.call(this,t)).mouseDown=function(t){if(("app"===t.target.id||"columns"===t.target.id)&&!1===s.state.dragging){var e=s.state,n=document.getElementById("app");e.dragPos={left:n.scrollLeft,top:n.scrollTop,x:t.clientX,y:t.clientY},e.dragging=!0,s.setState(e)}},s.mouseMove=function(t){if(("app"===t.target.id||"columns"===t.target.id)&&!0===s.state.dragging){var e=document.getElementById("app"),n=t.clientX-s.state.dragPos.x,a=t.clientY-s.state.dragPos.y;e.scrollTop=s.state.dragPos.top-a,e.scrollLeft=s.state.dragPos.left-n}},s.mouseUp=function(t){if(("app"===t.target.id||"columns"===t.target.id)&&!0===s.state.dragging){var e=s.state;e.dragging=!1,s.setState(e)}},s.state={dragging:!1,dragPos:{top:0,left:0,x:0,y:0}},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"app",id:"app",onMouseDownCapture:this.mouseDown,onMouseMove:this.mouseMove,onMouseUpCapture:this.mouseUp,children:Object(s.jsx)(h,{})})}}]),n}(i.a.Component),h=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(r.a)(this,n),(s=e.call(this,t)).save=function(){localStorage.setItem("userData",JSON.stringify(s.state.columns))},s.moveTask=function(t,e){var n=e.split("-")[0],a=e.split("-")[1],i=s.state.columns[n].tasks[a],o=s.state;o.columns[n].tasks.splice(a,1),o.columns[t].tasks.push(i),s.save(),s.setState(o)},s.deleteTask=function(t){var e=t.target.id,n=e.split("-")[0],a=e.split("-")[1],i=s.state;i.columns[n].tasks.splice(a,1),s.save(),s.setState(i)},s.deleteColumn=function(t){var e=s.state;e.columns.splice(t,1),s.save(),s.setState(e)},s.updateTaskTitle=function(t,e){var n=t,a=n.split("-")[0],i=n.split("-")[1],o=s.state;o.columns[a].tasks[i].title=e,s.save(),s.setState(o)},s.updateTitle=function(t,e){var n=s.state;n.columns[t].title=e,s.save(),s.setState(n)},s.newTask=function(t){var e=t.target.id.split("-")[1],n=s.state;n.columns[e].tasks.push({title:""}),s.save(),s.setState(n)},s.newColumn=function(){var t=s.state;t.columns.push({title:"",tasks:[]}),s.save(),s.setState(t)},s.state={columns:JSON.parse(localStorage.getItem("userData"))},s}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return this.state.columns?Object(s.jsxs)("div",{className:"columns",id:"columns",children:[this.state.columns.map((function(e,n){return Object(s.jsx)(b,{colId:n,title:e.title,tasks:e.tasks,deleteColumn:t.deleteColumn,deleteTask:t.deleteTask,updateTitle:t.updateTitle,updateTaskTitle:t.updateTaskTitle,newTask:t.newTask,moveTask:t.moveTask},n)})),Object(s.jsx)(T,{clicked:this.newColumn})]}):Object(s.jsx)("div",{className:"columns",id:"columns",children:Object(s.jsx)(T,{clicked:this.newColumn})})}}]),n}(i.a.Component),b=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(r.a)(this,n);for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))).delete=function(){t.props.deleteColumn(t.props.colId)},t.onDragOver=function(t){t.preventDefault()},t.onDrop=function(e,n){var s=e.dataTransfer.getData("taskId");t.props.moveTask(n,s)},t}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(s.jsxs)("div",{className:"column droppable",id:"column-".concat(this.props.colId),onDragOver:function(e){return t.onDragOver(e)},onDrop:function(e){return t.onDrop(e,t.props.colId)},children:[Object(s.jsx)(k,{title:this.props.title,colId:this.props.colId,updateTitle:this.props.updateTitle,defaultEdit:""===this.props.title}),Object(s.jsx)(f,{tasks:this.props.tasks,colId:this.props.colId,delete:this.props.deleteTask,updateTaskTitle:this.props.updateTaskTitle}),Object(s.jsxs)("div",{className:"column-options",children:[Object(s.jsx)(O,{clicked:this.props.newTask,colId:this.props.colId}),Object(s.jsx)(v,{icon:j.c,editing:!0,clicked:this.delete})]})]})}}]),n}(i.a.Component),k=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(r.a)(this,n),(s=e.call(this,t)).startEditing=function(){s.setState({editing:!0})},s.updateTitle=function(t,e){s.props.updateTitle(t,e)},s.stopEditing=function(t,e,n){("blur"===t.type||"keypress"===t.type&&"Enter"===t.code)&&(""===n.value&&s.updateTitle(e,"Untitled Task."),s.setState({editing:!1}))},s.state={editing:s.props.defaultEdit},s}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return!0===this.state.editing?Object(s.jsx)("input",{autoFocus:!0,type:"text",placeholder:"Enter Column Title",value:this.props.title,onChange:function(e){return t.updateTitle(t.props.colId,e.target.value)},onKeyPress:function(e){return t.stopEditing(e,t.props.colId,e.target)},onBlur:function(e){return t.stopEditing(e,t.props.colId,e.target)},className:"column-title column-title-input",id:"activeInput"}):Object(s.jsx)("h3",{className:"column-title",id:"title-".concat(this.props.colId),onClick:this.startEditing,children:this.props.title})}}]),n}(i.a.Component),f=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(s.jsx)("div",{className:"tasks-list",children:this.props.tasks.map((function(e,n){return Object(s.jsx)(g,{defaultEdit:""===e.title,taskId:"".concat(t.props.colId,"-").concat(n),title:e.title,delete:t.props.delete,updateTaskTitle:t.props.updateTaskTitle},n)}))})}}]),n}(i.a.Component),g=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(t){var s;return Object(r.a)(this,n),(s=e.call(this,t)).updateTaskTitle=function(t,e){s.props.updateTaskTitle(t,e)},s.stopEditing=function(t,e,n){("click"===t.type||"mouseleave"===t.type||"keypress"===t.type&&"Enter"===t.code)&&(""===n.value&&s.updateTaskTitle(e,"Untitled Task."),s.setState({editing:!1}))},s.delete=function(t){2===t.button&&!1===s.state.editing&&s.props.delete(t)},s.edit=function(t){0===t.button&&s.setState({editing:!0})},s.state={editing:s.props.defaultEdit},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("contextmenu",(function(t){t.preventDefault()}))}},{key:"onDragStart",value:function(t,e){t.dataTransfer.setData("taskId",e)}},{key:"render",value:function(){var t=this;return!0===this.state.editing?Object(s.jsxs)("div",{className:"task-card",id:this.props.taskId,onMouseLeave:function(e){return t.stopEditing(e,t.props.taskId,document.getElementById("activeInput"))},onMouseDownCapture:this.delete,onKeyPress:function(e){return t.stopEditing(e,t.props.taskId,document.getElementById("activeInput"))},children:[Object(s.jsx)("input",{autoFocus:!0,type:"text",placeholder:"Enter A Task Name",value:this.props.title,onChange:function(e){return t.updateTaskTitle(t.props.taskId,e.target.value)},className:"task-title task-title-input",id:"activeInput"}),Object(s.jsx)(v,{editing:!0,clicked:function(e){return t.stopEditing(e,t.props.taskId,document.getElementById("activeInput"))}})]}):Object(s.jsxs)("div",{draggable:!0,className:"task-card draggable",id:this.props.taskId,onMouseDownCapture:this.delete,onDragStart:function(e){return t.onDragStart(e,t.props.taskId)},children:[Object(s.jsx)("div",{className:"task-title",id:this.props.taskId,children:this.props.title}),Object(s.jsx)(v,{editing:!1,clicked:this.edit})]})}}]),n}(i.a.Component),v=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return this.props.icon?Object(s.jsx)("button",{className:"edit-task-button",onClick:this.props.clicked,style:{opacity:1},children:Object(s.jsx)(d.a,{icon:this.props.icon})}):!0===this.props.editing?Object(s.jsx)("button",{className:"edit-task-button",onClick:this.props.clicked,style:{opacity:1},children:Object(s.jsx)(d.a,{icon:j.b})}):Object(s.jsx)("button",{className:"edit-task-button",onClick:this.props.clicked,children:Object(s.jsx)(d.a,{icon:j.a})})}}]),n}(i.a.Component),O=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("button",{className:"new-task-button",onClick:this.props.clicked,id:"newTask-".concat(this.props.colId),children:"+ New Task"})}}]),n}(i.a.Component),T=function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("button",{className:"new-column-button",onClick:this.props.clicked,children:"+ New Column"})}}]),n}(i.a.Component),y=m,x=(n(25),function(t){Object(u.a)(n,t);var e=Object(p.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{id:"toolbar"})}}]),n}(i.a.Component)),I=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(e){var n=e.getCLS,s=e.getFID,a=e.getFCP,i=e.getLCP,o=e.getTTFB;n(t),s(t),a(t),i(t),o(t)}))};c.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("toolbar-container")),c.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("app-container")),I()}},[[26,1,2]]]);
//# sourceMappingURL=main.0b0b27d1.chunk.js.map