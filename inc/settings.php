<div class="wrap">
  <div class="">
    <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
    <!--
    <h2 class="nav-tab-wrapper dao-nav-tabs wp-clearfix">
      <a href="#dao-tab-1" class="nav-tab nav-tab-active">
        <?php esc_html_e('Main Setting', 'daofactory_pro'); ?>
      </a>
    </h2>
    -->
    <div class="definance-panel-tab panel-tab-active" id="definance-tab-1">
      <div class="definance-shortcode-panel-row">
        <form action="#" method="post" id="daofactory_settings_form" class="dao-form">
          <input type="hidden" id="post_url" value="<?php echo admin_url( 'admin-ajax.php' )?>" />
          <?php
            wp_nonce_field( 'daofactory_pro_settings_action', 'daofactory_pro_settings_action_nonce' );
          ?>
          <table class="form-table">
            <tbody>
              <tr>
                <th scope="row">
                  <label for="daofactory_pro_backend_type"><?php echo esc_html('Backend', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <?php $back_type = get_option('daofactory_pro_backend_type', 'DEFAULT'); ?>
                  <select name="daofactory_pro_backend_type" id="daofactory_pro_backend_type">
                    <option value="DEFAULT" <?php echo ($back_type == 'DEFAULT') ? 'selected' : ''?>>Default (https://snapshothub.onout.org)</option>
                    <option value="CUSTOM" <?php echo ($back_type == 'CUSTOM') ? 'selected' : ''?>>Custom</option>
                  </select>
                  <span class="-dao-info">
                    For more info about backend contact support
                    <a href="https://t.me/onoutsupportbot">onoutsupportbot in Telegram</a>
                  </span>
                </td>
              </tr>
              <tr id="daofactory_pro_backend_type_custom" <?php echo ($back_type == 'DEFAULT') ? 'class="-dao-hidden"' : ''?>>
                <th scope="row">
                  <label for="daofactory_pro_backend"><?php echo esc_html('Custom backend url', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <input
                    type="text"
                    name="daofactory_pro_backend"
                    id="daofactory_pro_backend"
                    value="<?php esc_attr_e(get_option('daofactory_pro_backend', 'https://'))?>"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="daofactory_pro_space_type"><?php echo esc_html('Space', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <?php $space_type = get_option('daofactory_pro_space_type', 'DEFAULT');?>
                  <select name="daofactory_pro_space_type" id="daofactory_pro_space_type">
                    <option value="DEFAULT" <?php echo ($space_type=='DEFAULT') ? 'selected' : ''?>>Default (onout.eth)</option>
                    <option value="CUSTOM" <?php echo ($space_type=='CUSTOM') ? 'selected' : ''?>>Custom</option>
                  </select>
                  <span class="-dao-info">
                    Your space must be registered at backend. For more info about spaces contact support <a href="https://t.me/onoutsupportbot">onoutsupportbot in Telegram</a>
                  </span>
                </td>
              </tr>
              <tr id="daofactory_pro_space_type_custom" <?php echo ($space_type=='DEFAULT') ? 'class="-dao-hidden"' : ''?>>
                <th scope="row">
                  <label for="daofactory_pro_space"><?php echo esc_html('Custom space', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <input
                    type="text"
                    name="daofactory_pro_space"
                    id="daofactory_pro_space"
                    value="<?php esc_attr_e(get_option('daofactory_pro_space', ''))?>"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="daofactory_pro_infurakey">
                    <?php echo esc_html('Infura Api Key', 'daofactory_pro'); ?>
                  </label>
                </th>
                <td>
                  <input
                    type="text"
                    name="daofactory_pro_infurakey"
                    id="daofactory_pro_infurakey"
                    value="<?php esc_attr_e(get_option('daofactory_pro_infurakey', ''))?>"
                  />
                  <span class="-dao-info">Leave blank for use default</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="daofactory_pro_wc2_enabled"><?php echo esc_html('WalletConnect', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <input
                    type="checkbox"
                    name="daofactory_pro_wc2_enabled"
                    id="daofactory_pro_wc2_enabled"
                    <?php echo (get_option('daofactory_pro_wc2_enabled', 'false') == 'true') ? 'checked' : '' ?>
                  />
                  <label for="daofactory_pro_wc2_enabled">
                    <?php echo esc_html('Enable WalletConnect V2', 'daofactory_pro'); ?>
                  </label>
                </td>
              </tr>
              <tr <?php echo (get_option('daofactory_pro_wc2_enabled') == 'true') ? '' : 'class="-dao-hidden"'; ?> id="daofactory_pro_wc2_pr_id_holder">
                <th scope="row">
                  <label for="daofactory_pro_wc2_pr_id">
                    <?php echo esc_html('WalletConnect ProjectId', 'daofactory_pro'); ?>
                  </label>
                </th>
                <td>
                  <input
                    type="text"
                    name="daofactory_pro_wc2_pr_id"
                    id="daofactory_pro_wc2_pr_id"
                    value="<?php esc_attr_e(get_option('daofactory_pro_wc2_pr_id', ''))?>"
                  />
                  <span class="-dao-info">
                    Leave blank for use default. Or make own at <a href="https://cloud.reown.com/" target="_blank">https://cloud.reown.com/</a>
                  </span>
                </td>
              </tr>
              <!--
              <tr>
                <th scope="row">
                  <label for="daofactory_pro_coinbase_enabled"><?php echo esc_html('CoinBase', 'daofactory_pro'); ?></label>
                </th>
                <td>
                  <input
                    type="checkbox"
                    name="daofactory_pro_coinbase_enabled"
                    id="daofactory_pro_coinbase_enabled"
                    <?php echo (get_option('daofactory_pro_coinbase_enabled', 'false') == 'true') ? 'checked' : '' ?>
                  />
                  <label for="daofactory_pro_coinbase_enabled">
                    <?php echo esc_html('Enable CoinBase Wallet', 'daofactory_pro'); ?>
                  </label>
                </td>
              </tr>
              -->
              <tr>
                <th scope="row"></th>
                <td>
                  <input type="submit" name="daofactory_pro_save""
                    class="button button-primary"
                    value="<?php esc_attr_e('Save changes', 'daofactory_pro'); ?>"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</div>