lab =
{ rm: { 
        name: 'laboratory', 
        desc: 'The Laboratory of the Mansion', 
        owner: 'brd',
        comment:  "Since the mansion is created with Javascript and node, you'll " +
          "find information about things we liked, struggled or whatever.",  
    part: 
    [
      { name: 'exp_list', 
        desc: 'The list of experiences', 
        comment: "the obj key represents the objective",
        part: [
          { 
            name: 'first experience', 
            desc: 'the first experience to be carried out', 
            obj: 'bla bla bla' 
          },
          { 
            name: 'second experence', 
            desc: ' the second experience to be carried out', 
            obj: 'bla bla bla'
          }]
       },
       { name: 'doc', 
         desc: 'This document represents the vision behind this lab', 
         url: 'tba', 
         comment: 'a url key represent a link to a location with more information' 
       },
       { name: 'sections', 
         desc: 'the lab sections',
         part: [
           { name: 'eosrc', 
             desc: 'eosrc stands for Easy Open SouRCe', 
             comment: 'this section ' + 
                      'of the lab is for experiments to improve the general state of documentations in ' +
                      'open source projects' 
           },
           { name: 'fxos', 
             desc: 'experiments with Firefox OS' 
           },
           { name: 'predictions', 
             desc: 'experiments with forecastings and predictions' 
           }
         ]
       },
       { name: 'recorder', 
         desc: 'a session recording machine',
         use: []        
       }
     ]
  }
}
