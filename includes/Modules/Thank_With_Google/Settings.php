<?php
/**
 * Class Google\Site_Kit\Modules\Thank_With_Google\Settings
 *
 * @package   Google\Site_Kit\Modules\Thank_With_Google
 * @copyright 2021 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Modules\Thank_With_Google;

use Google\Site_Kit\Core\Modules\Module_Settings;
use Google\Site_Kit\Core\Storage\Setting_With_Owned_Keys_Interface;
use Google\Site_Kit\Core\Storage\Setting_With_Owned_Keys_Trait;

/**
 * Class for Thank with Google settings.
 *
 * @since n.e.x.t
 * @access private
 * @ignore
 */
class Settings extends Module_Settings implements Setting_With_Owned_Keys_Interface {
	use Setting_With_Owned_Keys_Trait;

	const OPTION = 'googlesitekit_thank-with-google_settings';

	/**
	 * Registers the setting in WordPress.
	 *
	 * @since n.e.x.t
	 */
	public function register() {
		parent::register();

		$this->register_owned_keys();
	}

	/**
	 * Returns keys for owned settings.
	 *
	 * @since n.e.x.t
	 *
	 * @return array An array of keys for owned settings.
	 */
	public function get_owned_keys() {
		return array(
			'publicationID',
			'colorTheme',
			'buttonPlacement',
			'buttonPostTypes',
		);
	}

	/**
	 * Gets the default value.
	 *
	 * @since n.e.x.t
	 *
	 * @return array
	 */
	protected function get_default() {
		return array(
			'ownerID'         => '',
			'publicationID'   => '',
			'colorTheme'      => '',
			'buttonPlacement' => '',
			'buttonPostTypes' => array( 'post' ),
		);
	}
}