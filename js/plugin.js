$(document).ready(function () {
  // vehicle search ..
    let $mainSelect = $('#vehicleSelect');
    $mainSelect.find('option').remove();
    $.each(data, function (key, entry) {
      $mainSelect.append('<option value=' + entry.id + '>' + entry.name + '</option>');
    });
  // using chosen jquery library
    $('.vehicle-select-no-results').chosen({
      no_results_text: 'Oops, nothing found!',
      width: '100%',
      max_selected_options: 1
  
    });
    // fill model logo 
    $.each(data, function (key, entry) {
      $('.cars-models').append('<div  id=\'m-' + entry.id + '\' class=\'col-md-2 item\'><h4>' + entry.name + '</h4><div class=\'model-logo\'><img src=\'' + entry.src + '\'/></div></div>');
    });
  // after select
    $('.vehicle-select-no-results').on('change', function (evt, params) {
      console.log('evet', evt, 'parms', params);
      let selectedId = params.selected ? params.selected : null;
      let deselectedId = params.deselected ? params.deselected : null;
      //get selected vehicle
      let vehicle = data.filter((item) => {
        return item.id == params.selected;
      });
      console.log('vehicle', vehicle);
      let sid = '#m-' + selectedId;
      let desId = '#m-' + deselectedId;
      $(sid).addClass('item-selected');
      $(desId).removeClass('item-selected');
      if ($(sid).hasClass('item-selected')) {
        $(sid).siblings().addClass('d-none');
      } else {
        $(desId).siblings().removeClass('d-none');
      }
  
      $(sid).click(function () {
        // $('.cars-models .item').not(this).addClass('d-none');
        $('#vehicleSelect_chosen').addClass('d-none');
        $('#modelSelect').removeClass('d-none');
  
        // model search ..
        let $modelSelect = $('#modelSelect');
        $modelSelect.find('option').remove();
        $modelSelect.append('<option  disabled selected value=' + vehicle[0].id + '>' + vehicle[0].name + '</option>');
        $.each(models, function (key, entry) {
          $modelSelect.append('<option value=' + entry.id + '>' + entry.name + '</option>');
        });
      
        $('.cars-models').addClass('d-none');
        $('.model-types').removeClass('d-none');
        
  
        // fill model types 
        $.each(models, function (key, entry) {
          $('.model-types').append('<div id=\'t-' + entry.id + '\' class=\'model-item col-md-1 mx-2 p-0\'><span>' + entry.name + '</span></div>');
        });
        // using chosen jquery library
        $('.model-select-no-results').chosen({
          no_results_text: 'Oops, nothing found!',
          width: '100%',
          max_selected_options: 1
        });
      });
    });
  
    //after choose model
    $('.model-select-no-results').on('change', function (evt, params) {
      let selectedModel = params.selected ? params.selected : null;
      let deselectedModel = params.deselected ? params.deselected : null;
      let id = '#t-' + selectedModel;
      let desId = '#t-' + deselectedModel;
      $(id).addClass('model-selected');
      $(desId).removeClass('model-selected');
      $(id).click(function () {
        $('.model-types').addClass('d-none');
        $('.success-msg').removeClass('d-none');
      });
    });
  });
  
  
  