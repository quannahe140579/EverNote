var app = angular.module("app");
app.factory("noteTodos", ["$http", function($http){
    return {
        get: function(){
            return $http.get("/api/notes");
        },
        delete: function(id){
            return $http.delete("/api/note/" + id);
        },
        post: function(note){
            return $http.post("/api/create", note);
        }, 
        put: function(note){
            return $http.put("/api/note/update", note);
        },
        getTrash: function(){
            return $http.get("/client/trash");
        },
        postTrash: function(note){
            return $http.post("/client/posttrash", note);
        },
        clearTrash: function(){
            return $http.delete("/client/cleartrash");
        }
    }
}])