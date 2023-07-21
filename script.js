const tags = {
  "Computer" : "#e76f51",
  "Science" : "#f4a261",
  "Social" : "#e9c46a"
};

$(function () {

  function removeNote() {
    $(".remove-note")
      .off("click")
      .on("click", function (event) {
        event.stopPropagation();
        $(this).parents(".single-note-item").remove();
      });
  }

  function favouriteNote() {
    $(".favourite-note")
      .off("click")
      .on("click", function (event) {
        event.stopPropagation();
        $(this)
          .parents(".single-note-item")
          .toggleClass("note-favourite");
      });
  }

  function removeTag(){
    console.log("HII");
  }

  function addLabelGroups() {
    $(".category-selector .badge-group-item")
      .off("click")
      .on("click", function (event) {
        event.preventDefault();
        /* Act on the event */
        var getclass = this.className;
        var getSplitclass = getclass.split(" ")[0];
        if ($(this).hasClass("badge-business")) {
          $(this).parents(".single-note-item").removeClass("note-social");
          $(this)
            .parents(".single-note-item")
            .removeClass("note-important");
          $(this).parents(".single-note-item").toggleClass(getSplitclass);
        } else if ($(this).hasClass("badge-social")) {
          $(this)
            .parents(".single-note-item")
            .removeClass("note-business");
          $(this)
            .parents(".single-note-item")
            .removeClass("note-important");
          $(this).parents(".single-note-item").toggleClass(getSplitclass);
        } else if ($(this).hasClass("badge-important")) {
          $(this).parents(".single-note-item").removeClass("note-social");
          $(this)
            .parents(".single-note-item")
            .removeClass("note-business");
          $(this).parents(".single-note-item").toggleClass(getSplitclass);
        }
      });
  }

  var $btns = $(".note-link").click(function () {
    if (this.id == "all-category") {
      var $el = $("." + this.id).fadeIn();
      $("#note-full-container > div").not($el).hide();
    }
    if (this.id == "important") {
      var $el = $("." + this.id).fadeIn();
      $("#note-full-container > div").not($el).hide();
    } else {
      var $el = $("." + this.id).fadeIn();
      $("#note-full-container > div").not($el).hide();
    }
    $btns.removeClass("active");
    $(this).addClass("active");
  });

  $("#add-notes").on("click", function (event) {
    $("#addnotesmodal").modal("show");
    $("#btn-n-save").hide();
    $("#btn-n-add").show();
  });

  // Button add
  $("#btn-n-add").on("click", function (event) {
    event.preventDefault();
    /* Act on the event */
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()); //January is 0!
    var yyyy = today.getFullYear();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    today = dd + " " + monthNames[mm] + " " + yyyy;

    var $_noteTitle = document.getElementById("note-has-title").value;
    var $_noteDescription = document.getElementById(
      "note-has-description"
    ).value;

    var $_noteTags = $("#note-has-tag").val();
    $tagStr="";
    
    $_noteTags.forEach(element => {
      $tagStr+=(`<span class="badge badge-pill" style="background-color:${tags[element]};">${element}</span>`);
    });

    $html =
      '<div class="col-md-4 single-note-item all-category"><div class="card card-body">' +
      '<span class="side-stick"></span>' +
      '<h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="' +
      $_noteTitle +
      '">' +
      $_noteTitle +
      '<i class="point fa fa-circle ml-1 font-10"></i></h5>' +
      '<p class="note-date font-12 text-muted">' +
      today +
      '&nbsp;' +
      $tagStr +
      "</p>" +
      '<div class="note-content">' +
      '<p class="note-inner-content text-muted" data-noteContent="' +
      $_noteDescription +
      '">' +
      $_noteDescription +
      "</p>" +
      "</div>" +
      '<div class="d-flex align-items-center">' +
      '<span class="mr-1"><i class="fa fa-star favourite-note"></i></span>' +
      '<span class="mr-1"><i class="fa fa-trash remove-note"></i></span>' +
      '<div class="ml-auto">' +
      '<div class="category-selector btn-group">' +
      '<a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">' +
      '<div class="category">' +
      '<div class="category-business"></div>' +
      '<div class="category-social"></div>' +
      '<div class="category-important"></div>' +
      '<span class="more-options text-dark"><i class="icon-options-vertical"></i></span>' +
      "</div>" +
      "</a>" +
      '<div class="dropdown-menu dropdown-menu-right category-menu">' +
      '<a class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Business</a>' +
      '<a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Social</a>' +
      '<a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Important</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div></div> ";

    $("#note-full-container").prepend($html);
    $("#addnotesmodal").modal("hide");

    removeNote();
    favouriteNote();
    addLabelGroups();
  });

  $("#addnotesmodal").on("hidden.bs.modal", function (event) {
    event.preventDefault();
    document.getElementById("note-has-title").value = "";
    document.getElementById("note-has-description").value = "";
  });

  removeNote();
  favouriteNote();
  addLabelGroups();

  $("#btn-n-add").attr("disabled", "disabled");

  for(var element in tags){
    //var opt = tags[element];
    var el = document.createElement("option");
    el.textContent = element;
    el.value = element;
    $("#note-has-tag").append(el);
  }

  $("#note-has-tag").change(function () {
      var $this = $(this),
      value = $this.val();
      
      if (value !== null && value.length > 2) {
          $this.val(this.lastValidValue || null).trigger('change');
      } 
      else {
          this.lastValidValue = value;
      }
  }).trigger('change');

});

$("#note-has-title").keyup(function () {
  var empty = false;
  $("#note-has-title").each(function () {
    if ($(this).val() == "") {
      empty = true;
    }
  });

  if (empty) {
    $("#btn-n-add").attr("disabled", "disabled");
  } else {
    $("#btn-n-add").removeAttr("disabled");
  }
});


function removeTag(event){
  var tagsSel = JSON.parse(event.target.parentElement.parentElement.dataset.tagsSelected);
  var ind = tagsSel.indexOf(event.target.parentElement.textContent);
  if(ind!=-1){
    tagsSel.splice(ind,1);
    if(tagsSel.length==0){
      event.target.parentElement.parentElement.dataset.tagsSelected = "[]";
      event.target.parentElement.parentElement.textContent = "Tags";
    }
    else{
      event.target.parentElement.parentElement.dataset.tagsSelected = JSON.stringify(tagsSel);
    }
    event.target.parentElement.remove();
  }
  
}

$('.dropdown').each(function(index, dropdown) {

  //Find the input search box
  let search = $(dropdown).find('.search');

  //Find every item inside the dropdown
  let items = $(dropdown).find('.dropdown-item');

  //Capture the event when user types into the search box
  $(search).on('input', function() {
    filter($(search).val().trim().toLowerCase())
  });

  //For every word entered by the user, check if the symbol starts with that word
  //If it does show the symbol, else hide it
  function filter(word) {
    let length = items.length
    let collection = []
    let hidden = 0
    for (let i = 0; i < length; i++) {
      if (items[i].value.toString().toLowerCase().includes(word)) {
        $(items[i]).show()
      } else {
        $(items[i]).hide()
        hidden++
      }
    }

    //If all items are hidden, show the empty view
    if (hidden === length) {
      $(dropdown).find('.dropdown_empty').show();
    } else {
      $(dropdown).find('.dropdown_empty').hide();
    }
  }

  

  //If the user clicks on any item, set the title of the button as the text of the item
  $(dropdown).find('.dropdown-menu').find('.menuItems').on('click', '.dropdown-item', function() {
  var tagsel = JSON.parse(($('#selected-tags')[0].dataset.tagsSelected));
  if(!tagsel.includes($(this)[0].value) && tagsel.length<2){
    tagsel.push($(this)[0].value);
    if($('#selected-tags')[0].textContent.trim()=="Tags"){
      $('#selected-tags')[0].textContent="";
    } 
    $('#selected-tags')[0].dataset.tagsSelected = JSON.stringify(tagsel);
    $('#selected-tags')[0].innerHTML += `<span class="badge badge-pill search-tag" style="background-color:${tags[$(this)[0].value]}">${$(this)[0].value}<i class="fa fa-times" onclick="removeTag(event)" aria-hidden="true"></i></span>`;
  }

  
    
    
    // $(dropdown).find('#selected-tags').text($(this)[0].value);
    // $(dropdown).find('#selected-tags').dropdown('toggle');

  })
});