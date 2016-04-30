+function() {
    var rotate_classes = {
        1: '',
        2: 'fileinput-flip-horizontal',
        3: 'fileinput-rotate-full',
        4: 'fileinput-flip-vertical',
        5: 'fileinput-rotate-right fileinput-flip-horizontal',
        6: 'fileinput-rotate-right',
        7: 'fileinput-rotate-left fileinput-flip-horizontal',
        8: 'fileinput-rotate-left'
    };

    $('.fileupload-exif').on('change', function(e, result) {
        if (!result || result === 'clear') return;
        
        var bin_string = window.atob(result.replace(/^data:.+;base64,/, ''));
        var bin_file   = new EXIF.BinaryFile(bin_string);
        var info  = EXIF.findEXIFinJPEG(bin_file);

        if(typeof info.Orientation != "undefined" && typeof rotate_classes[info.Orientation] != "undefined" && rotate_classes[info.Orientation]) {
            $(this).find('.fileupload-preview img').addClass(rotate_classes[info.Orientation]); 
        }
    });
}();