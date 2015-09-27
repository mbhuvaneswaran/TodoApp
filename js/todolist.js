/**
 * Created by bhuvaneswaranm on 9/22/15.
 */
(function(TODO){
    function TodoList(listName,app){
        var app=app;
        var self=this;
        var name=listName;
        var todosElement;
        var todos=[];
        selectedTodo=-1;
        this.init=function(){

            return initialize();
        }
        this.resetSelectedTodo=function(todoItem){
            var todoItem=todoItem||todos[selectedTodo];
            if(selectedTodo>=0)
            todoItem.template.classList.remove('selected');
            selectedTodo=-1;
        }
        this.deleteSelectedItem=function(){
            if(selectedTodo>=0){
                removeTodoItem(todos[selectedTodo]);
                selectedTodo=-1;
            }
        }
        this.markAsImportant= function () {
            var todoItem=todos[selectedTodo];
            if(selectedTodo>=0 && !todos[selectedTodo].complete){
                this.resetSelectedTodo(todoItem);
                todoItem.markAsImportant();
                todos.splice(todos.indexOf(todoItem),1);
                todos.splice(0,0,todoItem)
            }

        }
        this.markAsComplete=function(){
            if(selectedTodo>=0)
            todos[selectedTodo].markAsComplete();
        }
        this.removeItem=function(item){
            removeTodoItem(item);
        }
        this.moveDown= function () {

            self.template.querySelector('.todo-item-text').blur();
            if(selectedTodo>=0 && (selectedTodo<todos.length-1)){
                todos[selectedTodo].template.classList.remove('selected');
            }
            if(selectedTodo<(todos.length-1))
                todos[++selectedTodo].template.classList.add('selected');
            if(selectedTodo==todos.length)
                selectedTodo--;

        }
        this.moveUp=function(){
            if(selectedTodo<0)
                selectedTodo++;
            if(selectedTodo>=1 && selectedTodo<(todos.length))
                todos[selectedTodo].template.classList.remove('selected');
            if(selectedTodo>=1)
                todos[--selectedTodo].template.classList.add('selected');

        }
        this.removeList=function(){
                app.removeTodoList(this);
        }
        function initialize(){
            var template=getTemplate(name);
            todosElement=template.querySelector('.todos');
            attachEvents(template);
            self.template=template;
            return self;
        }
        function addTodoItem(){
            var input=self.template.querySelector('.todo-item-text');
            var todoItem=new TODO.TodoItem(input.value,self).init();
            input.value="";
            input.blur();
            var itemTemplate=todoItem.template;
            todosElement.appendChild(itemTemplate);
            itemTemplate.classList.add('animate');
            todos.push(todoItem);

        }
        function removeTodoItem(item){
            item.template.parentNode.removeChild(item.template);
            todos.splice(todos.indexOf(item),1);
        }

        function getTemplate(listName){
            var template='<div class="list-container">'
                +'<div class="list-title">'
                +'<span>'+listName+'</span>'
                +'<span class="right remove-list"><i class="mdi mdi-close"></i></span>'
                +'</div>'
                +'<div class="todo-list-settings">'
                +'<input type="text" class="todo-item-text">'
                +'</div>'
                +'<div class="todos">'
                +'</div>'
                +'</div>'
            return TODO.toHTML(template);
        }
        function attachEvents(template){
            var input=template.querySelector('.todo-item-text');
            var deleteElm=template.querySelector('.remove-list');
            TODO.Event.on('keydown',input,keyPressHandler);
            TODO.Event.on('click',deleteElm,deleteListHandler);

        }
        function deleteListHandler(){
            self.removeList();
        }
        function keyPressHandler(event){
            if (event.which == 13 || event.keyCode == 13) {
                addTodoItem();
                event.stopPropagation();

            }
            if((event.which==68 || event.keyCode ==68)||(event.which==76 || event.keyCode ==76))
            event.stopPropagation();

        }

    }
    TODO.TodoList=TodoList;
})(TODO);
