/**
 * Admin Scripts
 */
(function( $ ){
	"use strict";

  console.log('>>> DAO FACTORY ADMIN SETTINGS')
  
  const $form = $('#daofactory_settings_form')
  
  /* backend type */
  const $backendType = $form.find('[name="daofactory_backend_type"]')
  const $backendTypeCustomHolder = $form.find('#daofactory_backend_type_custom')

  console.log('>>> backendType', $backendType, $form)
  $backendType.on('change', (e) => {
    console.log('>>> backendType', $backendType.val())
    if ($backendType.val() == 1) {
      $backendTypeCustomHolder.removeClass('-dao-hidden')
    } else {
      $backendTypeCustomHolder.addClass('-dao-hidden')
    }
  })
  /* Space */
  const $spaceType = $form.find('[name="daofactory_space_type"]')
  const $spaceTypeHolder = $form.find('#daofactory_space_type_custom')
  $spaceType.on('change', (e) => {
    if ($spaceType.val() == 1) {
      $spaceTypeHolder.removeClass('-dao-hidden')
    } else {
      $spaceTypeHolder.addClass('-dao-hidden')
    }
  })
  /* WC2 */
  const $wcEnabled = $form.find('[name="daofactory_wc2_enabled"]')
  const $wcPrIdHolder = $form.find('#daofactory_wc2_pr_id_holder')
  $wcEnabled.bind('change', (e) => {
    if ($wcEnabled.is(':checked')) {
      $wcPrIdHolder.removeClass('-dao-hidden')
    } else {
      $wcPrIdHolder.addClass('-dao-hidden')
    }
  })
})( jQuery );
