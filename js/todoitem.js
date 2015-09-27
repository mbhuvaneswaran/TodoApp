/**
 * Created by bhuvaneswaranm on 9/22/15.
 */
(function(TODO){
    function TodoItem(text,list){

        var todoText=text;
        var list=list;
        var self=this;
        this.init=function(){
             initialize();
            return self;
        }
        function initialize(){
            self.template=getTemplate(todoText);
            attachEvents(self.template);
        }
        function getTemplate(todoText){
            var template=  '<div class="todo">'
                +'<div class="todo-item-settings">'
                +'<a class="todo-item-setting mark-important"><i class="mdi mdi-lightbulb-outline"></i></a>'
            +'<a class="todo-item-setting right delete-item"><i class="mdi mdi-close"></i></a>'
            +'</div>'
            +'<div class="todo-text">'
            + todoText
            +'</div>'
            +'<a class="todo-item-setting complete-item right">'
            +'<i class="mdi mdi-check"></i>'
            +'</a>'
            +'</div>'
            return TODO.toHTML(template);
        }
        function deleteTodoItem(){
            list.removeItem(this);
        }
        this.markAsComplete=function(){
            this.complete=true;
            this.template.classList.add('completed');
        }
        this.markAsImportant=function(){
            var parentNode=self.template.parentNode;
            parentNode.removeChild(self.template);
            if(self.template.classList.contains('important')){
                self.template.classList.remove('important')
                parentNode.appendChild(self.template);

            }
            else{
                self.template.classList.add('important');
                parentNode.insertBefore(self.template,parentNode.firstChild);
            }
        }
        function attachEvents(template){
            var markImportantItem=template.querySelector('.mark-important');
            var completeItem=template.querySelector('.complete-item');
            var deleteItem=template.querySelector('.delete-item');
            TODO.Event.on('click',markImportantItem,function(){
                //Add important class and move to first
                //also alter the list array
                self.markAsImportant(event.currentTarget);

            });
            TODO.Event.on('click',deleteItem,function(){
                deleteTodoItem.call(self);
            })
            TODO.Event.on('click',completeItem,function(){
              self.markAsComplete();
            })
        }

    }
    TODO.TodoItem=TodoItem;
})(TODO);
