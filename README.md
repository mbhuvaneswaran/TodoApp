# TodoApp
TodoApp  helps you to organize your tasks by creating multiple task lists and add todo items to it.
# Installation
- Download the source and have npm,grunt installed

```
npm install
```
This will install all required modules.
```
grunt default
```
This will build the application inside build folder.

#Application Usage.
- Enter a list name and click on "Add List" button to add a new list.
- Each list has a input box in which todo item description can be entered and pressing enter key will add a todo item.
- Clicking complete icon will complete the todo task and will disable the todo item. It can only be deleted.
- Clicking delete icon will delete the todo item from list.
- Clicking the bulb icon will mark the todo items important and move it as first item in the list.
- Application is keyboard friendly.

#KeyBoard Shortcuts     
To get focus on the add list input
```
alt+l
```
To navigate over todo lists
```
alt + right navigation
alt + left navigation
```
To navigate todo items in list,navigate to any list

```
DownArrow to go down
UpArrow to go up
```
To mark a todo item as important,navigate to any todo item
```
Press i
```
To complete a todo item, navigate to any todo item
```
Press c
```
To delete a todo item, navigate to any todo item
```
Press Delete/Backspace
```
To focus on the input box in the todo list, navigate to any list
```
Press e
```
To delete a list, navigate to any list
```
Press Alt+d
```
#Testing
Basic unit test cases have been written.
Below command will run jasmine test cases.
```
grunt karma
```
