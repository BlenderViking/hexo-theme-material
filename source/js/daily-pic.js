var bingPictureLoader = bingPictureLoader || (function() {

    var bingUrl = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';

    var imgLoad = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function() {
            if (request.status === 200) {
                if(callback && 'success' in callback) {
                    callback.success(JSON.parse(request.response));
                }
            } else {
                if(callback && 'success' in callback) {
                    callback.error(Error('Image didn\'t load successfully; error code:' + request.statusText));
                }
            }
        };
        request.onerror = function() {
            if(callback && 'error' in callback) {
                callback.error(Error('There was a network error.'));
            }
        };
        request.send();
    };


    return {
        'retrieveANewPicture': function () {
            imgLoad(bingUrl, {
                'success' : function(json) {
                    if(json && 'images' in json && json.images.length > 0) {
                        var elem = document.getElementById('daily_picture_container');
                        if (elem != null) {
                            elem.style.backgroundImage = "url(https://www.bing.com"+json.images[0].url+")";
                        }
                    }
                }
            });
        }
    };
})();