There is the saying: "You never have a second chance to
make a first impression." By this time, we had hoped to
present a more attractive project. Maybe it should be
called "Mini Mansion" for we have just lay down the
foundations. The UI and functionality of this initial
version are minimal.

What is mansion.js?
-------------------

Mansion.js is an open source project designed
to help the creation of digital places where
people can live as they do in the real world.

It was influenced by Muds, Mushes, and MOOs
but it runs using node.js, socket.io, connect
and express, while the client is just a web
browser. So it's all Html/Css/Javascript.

Moreover, as opposed to Muds and the likes,
we don't encourage medieval (or
other similar imaginary) settings, nor do 
we want to support thousands of simultaneous
users. While we can imagine throwing a party
for a hundred persons, we normally, on our 
day to day dealings, seldom interact with
more than a dozen or twenty people. Because
of this, the default settings for the 
maximum number of users is 128.

The default digital estate created with mansion.js
has seven rooms: a library, a laboratory, a conference
room, an office, a living room, a (bed)room and a
chapel. Moreover, for the public, there is the garden,
the main entrance, and the mansion basement (TBD).   

Installation
------------

You need to have [node][1] installed. 

Then (git) clone this repository (grab the zip archive, if you don't have/want git).
In your local project directory: 

```
npm install 
```

After npm finished downloading its stuff, type: 

```
node app
```
and open your browser at: *http://localhost:3000*. 

If you run it on a network (instead of just testing it locally),
you'll have to change the two references to "localhost", in the
file *mush_.html* of the public directory, to the ip address of
your server. You might also have to tweak your firewall/antivirus 
settings (for more info, see [here][2]) 

Mansion keys
------------

A room (and most objects) in a mansion is just a Javascript 
object with special keys: *name*, *desc*, *part*, *use*, 
and *url*. The *desc(ription)* key is the string that is
displayed when the users look at the object; *part* and *use*
are collections (ie arrays).

There is more than a dozen commands that users can use to
interact in the environment: /g(o), /l(ook), /s(ay), /h(elp),
/m(ove), /p(ick), /d(rop), /n(ames), /w(ho), /r(ecord), /roff
(recording off), /c(lear), /b(uild), /u(sers) (some of these
are not functional yet, you'll get a notice when used).


Mansion.js is designed as a thin server/rich client application.
For a traditional MUD, it would be a dubious decision. But Mansion.js
is *not* a MUD, it was influenced by MUDs: "It's not a game, it's a
place."

Credits
-------

Some code was taken, inspired, and/or modified from the socket.io and
express projects. The same can be said about the code from the books
JavaScript: The Definitive Guide by Flanagan and Professional Node.js
by Teixeira.

License
-------

Apache License 2.0

[1]: http://nodejs.org
[2]: https://github.com/LearnBoost/socket.io/wiki/Socket.IO-and-firewall-software
