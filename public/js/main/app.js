var app = angular.module("app", []);
app.controller("EvController", [
  "$scope",
  "noteTodos",
  function ($scope, noteTodos) {
    $scope.notes = [];
    $scope.formData = {};
    $scope.loadding = false;

    var getDate = function () {
      var d = new Date();
      return d.getDate() + " " + d.getMonth() + 1 + ", " + d.getFullYear();
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

    $scope.addNewNote = function () {
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
    };

    $scope.saveNote = function () {
      $scope.loadding = true;
      $scope.currentNote.lastEdit = getDate();
      noteTodos.put($scope.currentNote).then(function (result) {
        $scope.notes = result.data;
        $scope.loadding = false;
      });
    };

    $scope.deleteNote = function () {
      $scope.loadding = true;
      noteTodos.delete($scope.currentNote._id).then(function (result) {
        $scope.notes = result.data;

        if (result.data.length == 0) {
          $scope.currentNote._id = "";
          $scope.currentNote.name = "";
          $scope.currentNote.content = "";
          $scope.currentNote.lastEdit = "";
        }else{
          $scope.currentNote._id = $scope.notes[0]._id;
          $scope.currentNote.name = $scope.notes[0].name;
          $scope.currentNote.content = $scope.notes[0].content;
          $scope.currentNote.lastEdit = $scope.notes[0].lastEdit;
        }
        $scope.loadding = false;
      });
    };
  },
]);
