
# Book Inventory Mannagement
A Node.js/Express.js backend API for Book Inventory Management service.


## Features

#### User:
A user can Register, Log-in & Log-out from the service.  
A user can create Stores and listout all his Stores.

#### Store:
A user MUST create a Store in order to add books. User can not add books without creating a Store.  
The User can create multiple Stores. Same books listed on different stores will be treated as different copies & will have separate stock.  
Selecting a Store will list out all the Books for that Store along with other details.

#### Books:
User can add/delete/update books for a Store.  
Adding a book will autometically fetch its googlebookApi id and save it. 
(Assumption: googlebookApi gives the correct book as its first result.)


## Installation
Node with npm, git & mongoDB are required to run the project.

-  $ git clone https://github.com/Sulagnodeep/book_inventory_management.git
- cd book_inventory_management
- npm install  
- npm start



