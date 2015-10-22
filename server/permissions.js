// A logged user is allowed to edit
// all objects that are owned by him.
var userPermissions = {
  insert: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  remove: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  update: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
};

Subjects.allow(userPermissions);
Hypervideos.allow(userPermissions);
Subvideos.allow(userPermissions);
Questions.allow(userPermissions);
Videos.allow(userPermissions);