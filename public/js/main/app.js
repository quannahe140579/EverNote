var app = angular.module("app", []);
app.controller("EvController", [
  "$scope",
  "noteTodos",
  function ($scope, noteTodos) {
    $scope.notes = [];
    $scope.formData = {};
    $scope.loadding = false;
    $scope.disabled = false;
    var getDate = function () {
      var d = new Date();
      return (
        d.getDate() +
        " " +
        (parseInt(d.getMonth()) + 1) +
        ", " +
        d.getFullYear()
      );
    };

    $scope.currentNote = {
      _id: "",
      name: "",
      content: "",
      lastEdit: "",
    };

    $scope.notes = noteTodos.get().then(
      function (result) {
        $scope.notes = result.data;
        if (result.data.length != 0) {
          $scope.currentNote._id = $scope.notes[0]._id;
          $scope.currentNote.name = $scope.notes[0].name;
          $scope.currentNote.content = $scope.notes[0].content;
          $scope.currentNote.lastEdit = $scope.notes[0].lastEdit;
        }
      },
      function (err) {
        if (err) throw err;
      }
    );
    function sort(arr) {
      arr.sort(function (a, b) {
        return a.name - b.name;
      });
      console.log($scope.notes);
    }
    $scope.showNotes = function () {
      $scope.disabled = false;
      noteTodos.get().then(function (result) {
        $scope.notes = result.data;
      });
    };

    $scope.addNewNote = function () {
      $scope.disabled = false;
      $scope.loadding = true;
      var note = {
        name: "Untitled",
        content: "",
        lastEdit: getDate(),
      };

      noteTodos.post(note).then(function (result) {
        $scope.notes = result.data;
        $scope.loadding = false;
      });
    };

    $scope.changeNote = function (note) {
      $scope.currentNote._id = note._id;
      $scope.currentNote.name = note.name;
      $scope.currentNote.content = note.content;
      $scope.currentNote.lastEdit = note.lastEdit;
      if (typeof $scope.notes.length != 0) {
        sort($scope.notes);
      }
    };

    $scope.saveNote = function () {  
      $scope.currentNote.lastEdit = getDate();
      noteTodos.put($scope.currentNote).then(function (result) {
        $scope.notes = result.data;
      });
    };

    $scope.deleteNote = async function () {
      $scope.loadding = true;
      var obj = Object.assign({}, $scope.currentNote);

      console.log(obj);
      await noteTodos.delete($scope.currentNote._id).then(function (result) {
        $scope.notes = result.data;

        if (result.data.length == 0) {
          $scope.currentNote._id = "";
          $scope.currentNote.name = "";
          $scope.currentNote.content = "";
          $scope.currentNote.lastEdit = "";
        } else {
          $scope.currentNote._id = $scope.notes[0]._id;
          $scope.currentNote.name = $scope.notes[0].name;
          $scope.currentNote.content = $scope.notes[0].content;
          $scope.currentNote.lastEdit = $scope.notes[0].lastEdit;
        }
      });
      console.log(obj);

      noteTodos.postTrash(obj).then(function () {
        $scope.loadding = false;
      });
    };
    $scope.change = function(){
      setTimeout(function(){
        $scope.saveNote();
      }, 1000);
    }
    $scope.clearTrashs = function () {
      $scope.disabled = true;
 
      if (confirm("Do you want clear trash ?") == false) {
        return;
      }

      $scope.changeNote({
        _id: "",
        name: "",
        content: "",
        lastEdit: "",
      });
      noteTodos.clearTrash().then(function (result) {
        $scope.notes = result.data;
        $scope.disabled = false;
      });
    };
    $scope.getTrashs = function () {
      $scope.disabled = true;
      $scope.changeNote({
        _id: "",
        name: "",
        content: "",
        lastEdit: "",
      });
      noteTodos.getTrash().then(function (result) {
        $scope.notes = result.data;
      });
    };
  },
]);
