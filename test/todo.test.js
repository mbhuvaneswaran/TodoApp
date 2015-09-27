/**
 * Created by bhuvaneswaranm on 9/26/15.
 */
var elm='<div class="main-container todo-app"></div>'
document.body.insertAdjacentHTML(
    'afterbegin',
    elm);
describe("A suite", function() {
    var simulateEvent;
    beforeEach(function(){
        simulateEvent=function(el,keyCode,event){
            var eventObj = document.createEventObject ?
                document.createEventObject() : document.createEvent("Events");
            if(eventObj.initEvent){
                eventObj.initEvent(event, true, true);
            }// Dispatch event into document
            eventObj.which=keyCode;
            eventObj.keyCode=keyCode;
            el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("on"+event, eventObj);
        }
    })
    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
    it('should initialize the todo app', function () {
        expect(document.querySelector('.todo-main-container')).not.toBeUndefined();

    })
    it('should add a new list',function(){
        document.querySelector('.todo-main-container .list-input').value="Test List";
        document.querySelector('.todo-main-container .todo-settings .button').click();
        var listName=document.querySelector('.list-container .list-title span').textContent;
        expect(listName).toBe("Test List")

    })
    it("should add new todo item",function(){
        var inputElm=document.querySelector('.list-container .todo-list-settings .todo-item-text');
        inputElm.focus();
        inputElm.value = "Buy Milk";
        simulateEvent(inputElm,13,'keypress');
        expect(document.querySelector('.list-container .todos .todo .todo-text').textContent).toBe("Buy Milk");
        inputElm.value = "Buy Choclate";
        simulateEvent(inputElm,13,'keypress');

    })
    it('should mark the second item as important', function () {
        debugger;
        var todoItems=document.querySelectorAll('.list-container .todos .todo');
        var secondItem=todoItems[1];
        secondItem.querySelector('.mark-important').click();
        var firstItem=document.querySelectorAll('.list-container .todos .todo')[0];
        expect(firstItem.querySelector('.todo-text').textContent).toBe(secondItem.querySelector('.todo-text').textContent);
    })
    it("should complete the todo item",function(){
        debugger;
        var todoItem=document.querySelector('.list-container .todos .todo');
        expect(todoItem.classList.contains('completed')).toBe(false);
        var completeIcon=document.querySelector('.list-container .todos .todo .complete-item');
        completeIcon.click();
        expect(todoItem.classList.contains('completed')).toBe(true);
    })
    it("should delete the todo item",function(){

        expect(document.querySelectorAll('.list-container .todos .todo').length).toBe(2);
        var deleteIcon=document.querySelector('.list-container .todos .todo .todo-item-settings .delete-item');
        deleteIcon.click();

        expect(document.querySelectorAll('.list-container .todos .todo').length).toBe(1);
    })



});