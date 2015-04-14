// Upload functionality for Bootstrap File input xtra

(function() {
  function upload(url, file, values, success, error) {
    var formData = new FormData();
    
    formData.append('file', file);
    
    for (var key in values) {
      formData.append(key, values[key]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = function () {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error();
      }
    };

    xhr.send(formData);
  }
  
  $('.fileinput .upload').on('click', function() {
    var $fileinput = $(this).closest('.fileinput');
    var file = $fileinput.data('bs.fileinput').file;
    var values = $fileinput.data('bs.fileinput').position;
    
    upload(
      $(this).data('url'),
      file,
      values,
      function(src) {
        $fileinput.replaceWith($('<img>').attr('src', src));
      },
      function() {
        $fileinput.find('.upload-hidden').show();
        $fileinput.find('.upload-message').html("<span class='alert alert-error'>Something went wrong...</span>");
      }
    );

    $fileinput.find('.upload-hidden').hide();
    $fileinput.find('.upload-message').show();
  });
})();
