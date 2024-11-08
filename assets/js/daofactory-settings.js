/**
 * Admin Scripts
 */
(function( $ ){
	"use strict";

  console.log('>>> DAO FACTORY ADMIN SETTINGS')
  
  const $form = $('#daofactory_settings_form')
  
  /* backend type */
  const $backendType = $form.find('[name="daofactory_pro_backend_type"]')
  const $backendTypeCustomHolder = $form.find('#daofactory_pro_backend_type_custom')

  console.log('>>> backendType', $backendType, $form)
  $backendType.on('change', (e) => {
    console.log('>>> backendType', $backendType.val())
    if ($backendType.val() == 'CUSTOM') {
      $backendTypeCustomHolder.removeClass('-dao-hidden')
    } else {
      $backendTypeCustomHolder.addClass('-dao-hidden')
    }
  })
  /* Space */
  const $spaceType = $form.find('[name="daofactory_pro_space_type"]')
  const $spaceTypeHolder = $form.find('#daofactory_pro_space_type_custom')
  $spaceType.on('change', (e) => {
    if ($spaceType.val() == 'CUSTOM') {
      $spaceTypeHolder.removeClass('-dao-hidden')
    } else {
      $spaceTypeHolder.addClass('-dao-hidden')
    }
  })
  /* WC2 */
  const $wcEnabled = $form.find('[name="daofactory_pro_wc2_enabled"]')
  const $wcPrIdHolder = $form.find('#daofactory_pro_wc2_pr_id_holder')
  $wcEnabled.bind('change', (e) => {
    if ($wcEnabled.is(':checked')) {
      $wcPrIdHolder.removeClass('-dao-hidden')
    } else {
      $wcPrIdHolder.addClass('-dao-hidden')
    }
  })
  
  const $submit = $form.find('[name="daofactory_pro_save"]')
  $submit.on('click', (e) => {
    e.preventDefault()
    
    console.log('>>> submit')
    let args = []
    $form.find('[name]').each(( i , el) => {
      if ($(el).attr('type') == 'checkbox') {
        args[$(el).attr('name')] = $(el).is(':checked')
      } else {
        args[$(el).attr('name')] = $(el).val()
      }
    })
    console.log('>>> args', args)
    console.log('>>> url', $($form.find('#post_url')).val())
    $.ajax({
        type : "POST",
        dataType : "json",
        url : $($form.find('#post_url')).val(),
        data : {
          action: "daofactory_pro_save_settings",
          ...args
        },
        success: function(response) {
            alert("Changes saved");
        }
    });
  })
})( jQuery );
