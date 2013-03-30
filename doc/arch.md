Architecture and design notes
-----------------------------

- a thin server/rich client design

	We have already rewritten parts of the code, in order to push
as much as possible of the processing on the client side. 


- *_.html filenames

	In the *public* directory, the filenames ending in *_.html are
just wrappers that load the room objects representation and call
$().mansion.view. ATM, the function view just replaced a temporary
division with the room name, description and a list of the objects
in the room. 

	In fact, we are using Javascript objects as the representation of
our data (as models). JSON is often used in this way, we put some
extra requirements on Javascript objects in Mansion.js. 

- the room representation

	Each room is just a Javacript object with a *rm* key and objects
with *name*, *desc*, some have *part* and/or *use* (to be done) and/or
*url*. 

	When the user types '/l' in the input box, the descriptions of every
objects in the part's collection of the room is displayed in the messages box. 
If the user types '/n', the list of names in the part's collection is displayed.

