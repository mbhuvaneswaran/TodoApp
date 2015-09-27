/**
 * Created by bhuvaneswaranm on 9/22/15.
 */
var TODO={};
(function (TODO) {
    function TodoApp(rootElm){
        var rootElement=rootElm;
        var appTemplate;
        var selectedList=-1;
        var lists=[];
        var keyCodes={
            alt:{
            code:18,
            status:false
            },
            left:{
                code:37,
                status:false
            },
            right:{
                code:39,
                status:false
            },
            up:{
                code:38,
                status:false
            },
            down:{
                code:40,
                status:false
            },
            l:{
                code:76,
                status:false
            },
            enter:{
                code:13,
                status:false
            },
            delete:{
                code:46,
                status:false
            },
            backspace:{
                code:8,
                status:false
            },
            i:{
                code:73,
                status:false
            },
            c:{
                code:67,
                status:false
            },
            e:{
                code:69,
                status:false
            }


    }
        this.init=function(){
            //initialize todoapp
            initialize();

        }
        function initialize() {
            //Get the initial template and append to root of application
            var template=getTemplate();
            appTemplate=template;
            attachEvents(template);
            rootElement.appendChild(template);
        }
        function addTodoList(){
            //Add new todo list and add the entry to lists.
            var listName=appTemplate.querySelector('.list-input').value;
            var list=new TODO.TodoList(listName).init();
            rootElement.appendChild(list.template);
            lists.push(list);
        }
        function getTemplate(){
                var template='<div class="todo-main-container"><div class="todo-settings">'
                +'<input type="text" class="list-input">'
                +'<a class="button">Add List</a>'
                +'</div> <div class="todo-container"></div></div>';
            return TODO.toHTML(template);
        }
        function attachEvents(template){
                var btn=template.querySelector('.todo-settings .button');
                var input=template.querySelector('.list-input');
                TODO.Event.on('keypress',input,keyPressHandler);
                TODO.Event.on('click',btn,addTodoList);
                TODO.Event.on('keydown',document.body,keyBoardDownHandler);
                TODO.Event.on('keyup',document.body,keyBoardUpHandler);

        }
        function keyPressHandler(event){
            if (event.which == 13 || event.keyCode == 13) {
                addTodoList();
            }
        }
        function keyBoardDownHandler(event){
            switch (event.keyCode){
                case keyCodes.alt.code :keyCodes.alt.status=true;break;
                case keyCodes.left.code :keyCodes.left.status=true;break;
                case keyCodes.up.code :keyCodes.up.status=true;break;
                case keyCodes.down.code :keyCodes.down.status=true;break;
                case keyCodes.right.code :keyCodes.right.status=true;break;
                case keyCodes.enter.code :keyCodes.enter.status=true;break;
                case keyCodes.l.code :keyCodes.l.status=true;break;
                case keyCodes.delete.code :keyCodes.delete.status=true;break;
                case keyCodes.backspace.code :keyCodes.backspace.status=true;break;
                case keyCodes.i.code :keyCodes.i.status=true;break;
                case keyCodes.c.code :keyCodes.c.status=true;break;
                case keyCodes.e.code :keyCodes.e.status=true;break;
            }
            if(keyCodes.alt.status){
                if(keyCodes.right.status){
                    //move to next list
                    if(selectedList>=0)
                    lists[selectedList].resetSelectedTodo();
                    if(selectedList>=0 && selectedList<(lists.length-1))
                    lists[selectedList].template.classList.remove('selected');
                    if(selectedList<(lists.length-1))
                    lists[++selectedList].template.classList.add('selected');
                    if(selectedList==lists.length)
                    selectedList--;
                    lists[selectedList].template.querySelector('.todo-item-text').focus();
                }
                if(keyCodes.left.status){
                    //move previous list
                    if(selectedList>=0)
                    lists[selectedList].resetSelectedTodo();
                    if(selectedList<0)
                        selectedList++;
                    if(selectedList>=1 && selectedList<(lists.length))
                        lists[selectedList].template.classList.remove('selected');
                    if(selectedList>=1)
                        lists[--selectedList].template.classList.add('selected');
                    lists[selectedList].template.querySelector('.todo-item-text').focus();
                    lists[selectedList].resetSelectedTodo();



                }
                if(keyCodes.l.status){
                    event.preventDefault();
                    if(selectedList>=0){
                        lists[selectedList].resetSelectedTodo();
                    }
                    var input=appTemplate.querySelector('.list-input');
                    input.focus();
                    input.value="";

                }

            }
            if(keyCodes.down.status){
                //move down the list
                if(selectedList>=0){
                    lists[selectedList].moveDown();
                }
            }
            if(keyCodes.up.status){
                //move up the list
                if(selectedList>=0){
                    lists[selectedList].moveUp();

                }
            }
            if(keyCodes.delete.status || keyCodes.backspace.status){
                //delete the todo item
                if(selectedList>=0){
                    lists[selectedList].deleteSelectedItem();
                }
            }
            if(keyCodes.i.status){
                //mark as important
                if(selectedList>=0)
                    lists[selectedList].markAsImportant();
            }
            if(keyCodes.c.status){
                //mark as complete
                if(selectedList>=0)
                    lists[selectedList].markAsComplete();
            }
            if(keyCodes.e.status){
                //focus on list input element.
                if(selectedList>=0){
                    lists[selectedList].template.querySelector('.todo-item-text').focus();
                    event.preventDefault();
                }
            }
        }
        function keyBoardUpHandler(event) {

            switch (event.keyCode) {
                case keyCodes.alt.code :
                    keyCodes.alt.status = false;
                    break;
                case keyCodes.left.code :
                    keyCodes.left.status = false;
                    break;
                case keyCodes.up.code :
                    keyCodes.up.status = false;
                    break;
                case keyCodes.down.code :
                    keyCodes.down.status = false;
                    break;
                case keyCodes.right.code :
                    keyCodes.right.status = false;
                    break;
                case keyCodes.enter.code :
                    keyCodes.enter.status = false;
                    break;
                case keyCodes.l.code :
                    keyCodes.l.status = false;
                    break;
                case keyCodes.delete.code :
                    keyCodes.delete.status = false;
                    break;
                case keyCodes.backspace.code :
                    keyCodes.backspace.status = false;
                    break;
                case keyCodes.i.code :
                    keyCodes.i.status = false;
                    break;
                case keyCodes.c.code :
                    keyCodes.c.status = false;
                    break;
                case keyCodes.e.code :
                    keyCodes.e.status = false;
                    break;

            }
        }

    }
    TODO.Event={
            on: function (event,element,handler) {
                if (document.addEventListener) {
                    element.addEventListener(event, handler);
                }
                else {
                    element.attachEvent("on" + event, handler);
                }

            }
        }
    TODO.toHTML=function (template) {
            var templateHolder = document.createElement("div");
            templateHolder.innerHTML = template;
            return templateHolder.firstChild;
        }

    TODO.TodoApp=TodoApp;
})(TODO);
