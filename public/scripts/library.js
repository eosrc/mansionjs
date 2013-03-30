library = 
{ rm: {
    desc: 'The library of the mansion',
    title: 'The Library',
    name: 'library',
    comment: "The library contains, among other things, a collection " +
      "of books (we haven't decided how to represent each book yet).",

    part: [
      { name: 'collection',
        desc: 'The list of books',
        part: [
          { desc: 'my first book', 
            name: 'The first book title' 
          },
          { desc: 'a second book', 
            name: 'the second book title' 
          }
        ]
      }]
  }} 



