Hypervideo = Astro.Class({
  name: 'Hypervideo',
  collection: Hypervideos,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    subjectId: {
      type: 'string',
      validator: Validators.required(),
    },
    name:{
      type: 'string',
      default: 'Novo Hypervideo',
      validator: Validators.and([
          Validators.required('O nome não pode ser vazio'),
          Validators.string(),
          Validators.minLength(5,'Nome muito curto')
        ])
    },
    connections: {
      type: 'array',
      default: function() {
        return [];
      }
    },
    col: {
      type: 'number',
      validator: Validators.required(),
    },
    row: {
      type: 'number',
      validator: Validators.required(),
    },
  },
  methods: {
    move: function(col,row) {
      this.col = col;
      this.row = row;
    },
    subvideos: function() {
      return Subvideo.find({hypervideoId: this._id}).fetch();
    },
    questions: function() {
      return Question.find({hypervideoId: this._id}).fetch();
    },
    addConnection: function(conn) {
      if(this._hasConnection(conn)) {
        return false;
      }
      else {
        this.push('connections',conn);
        this.save();
        return true;
      }
    },
    removeConnections: function(hypervideoId) {
      var newConnections = [];
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        if (hypervideoId !== compConn.first &&
            hypervideoId !== compConn.second) {
          newConnections.push(compConn);
        }
      }
      this.set('connections', newConnections);
      this.save();
    },
    removeConnection: function(connection) {
      var compConn = this.pop('connections',1);
      if(compConn !== connection) {
        this.push('connections',compConn);
      }
      this.save();
      return true;
    },
    setName: function(newName) {
      this.set('name', newName);
      this.save();
    },
    //private methods
    _hasConnection: function(conn) {
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        console.log(compConn);
        if ((conn.first === compConn.first &&
            conn.second === compConn.second) ||
           (conn.second === compConn.first &&
             conn.first === compConn.second)) {
          return true;
        }
      }
      return false;
    },
  },
  behaviors: ['timestamp']
});
