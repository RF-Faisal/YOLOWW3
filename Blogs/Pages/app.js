// reading from db


var postcomment = function() {
    var name = document.getElementById('name-val').value;
    var comment = document.getElementById('comment-val').value;
    var date = new Date();
    var timestamp = date.getTime();
    firebase.database().ref('Comment/' + timestamp).set({
        name: name,
        comment: comment
    }, function(error) {
        if (error) {
            // The write failed...
        } else {
            alert("DONE");


        }
    });
    rendercomments();
}

var rendercomments = function() {
    firebase.database().ref('Comment/').once('value').then(function(snapshot) {
        document.getElementById('comment-loader').innerHTML = "";
        var i=0;
        snapshot.forEach(function(child) {
            var name= child.val().name;
            var commenttext= child.val().comment;
            var comment = document.getElementById('default-comment').cloneNode(true);
            comment.style.display = "block";
            comment.id = "comment" + (++i);
            comment.children[0].innerHTML = name;
            comment.children[1].innerHTML = commenttext;
            document.getElementById('comment-loader').appendChild(comment);
            console.log(comment);
            console.log(name);
            console.log(commenttext);
        });
        }, function(error) {
            if (error) {
            } else {

            }
          });
}


window.addEventListener('DOMContentLoaded', event => {

    rendercomments();

});