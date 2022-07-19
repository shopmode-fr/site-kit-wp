<?php
/**
 * Class Google\Site_Kit\Modules\Thank_With_Google\Web_Tag
 *
 * @package   Google\Site_Kit\Modules\Thank_With_Google
 * @copyright 2022 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Modules\Thank_With_Google;

use Google\Site_Kit\Core\Modules\Tags\Module_Web_Tag;
use Google\Site_Kit\Core\Util\Method_Proxy_Trait;
use Google\Site_Kit\Core\Tags\Tag_With_DNS_Prefetch_Trait;

/**
 * Class for Web tag.
 *
 * @since n.e.x.t
 * @access private
 * @ignore
 */
class Web_Tag extends Module_Web_Tag {

	use Method_Proxy_Trait, Tag_With_DNS_Prefetch_Trait;

	/**
	 * Publication ID.
	 *
	 * @since n.e.x.t
	 * @var string
	 */
	private $publication_id;

	/**
	 * Button placement.
	 *
	 * @since n.e.x.t
	 * @var string
	 */
	private $button_placement;

	/**
	 * Button post types.
	 *
	 * @since n.e.x.t
	 * @var string[]
	 */
	private $button_post_types;

	/**
	 * Sets the current publication ID.
	 *
	 * @since n.e.x.t
	 *
	 * @param string $publication_id Publication ID.
	 */
	public function set_publication_id( $publication_id ) {
		$this->publication_id = $publication_id;
	}

	/**
	 * Sets the current button placement.
	 *
	 * @since n.e.x.t
	 *
	 * @param string $button_placement Button placement.
	 */
	public function set_button_placement( $button_placement ) {
		$this->button_placement = $button_placement;

	}

	/**
	 * Sets the current button post types.
	 *
	 * @since n.e.x.t
	 *
	 * @param string[] $button_post_types Button post types.
	 */
	public function set_button_post_types( $button_post_types ) {
		$this->button_post_types = $button_post_types;
	}

	/**
	 * Registers tag hooks.
	 *
	 * @since n.e.x.t
	 */
	public function register() {
		add_action( 'wp_enqueue_scripts', $this->get_method_proxy( 'enqueue_twg_script' ) );
		add_filter( 'the_content', $this->get_method_proxy( 'update_the_content' ) );
		add_filter(
			'wp_resource_hints',
			$this->get_dns_prefetch_hints_callback( '//news.google.com' ),
			10,
			2
		);

		$this->do_init_tag_action();
	}

	/**
	 * This method is intended a web tag, but it does nothing in this module as the tag is enqueued.
	 *
	 * @since n.e.x.t
	 */
	protected function render() {
		// Do nothing, Thank with Google script is enqueued.
	}

	/**
	 * Enqueues the "Thanks with Google" script.
	 *
	 * @since n.e.x.t
	 */
	protected function enqueue_twg_script() {
		$twg_src = 'https://news.google.com/thank/js/v1/thank.js';

		$is_singular_button_post_type_entity = $this->is_singular_button_post_type_entity();

		$twg_inline_script = sprintf(
			"
			(self.SWG_BASIC = self.SWG_BASIC || []).push(subscriptions => {
				subscriptions.init({
					type: 'Blog',
					isPartOfType: ['Blog', 'Product'],
					isPartOfProductId: '%s:default',
					buttonPosition: '%s',
					permalink: '%s',
					pluginVersion: '%s',
					postTitle: '%s'
				});
			});
			",
			esc_js( $this->publication_id ),
			esc_js( substr( $this->button_placement, 0, 7 ) === 'static_' ? 'inline' : 'floating' ), // strlen( 'static_' ) is 7.
			esc_js( $is_singular_button_post_type_entity ? get_permalink() : '' ),
			esc_js( GOOGLESITEKIT_VERSION ),
			esc_js( $is_singular_button_post_type_entity ? get_the_title() : '' )
		);

		// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
		wp_register_script( 'google_thankjs', $twg_src, array(), null, true );
		wp_add_inline_script( 'google_thankjs', $twg_inline_script, 'before' );

		$filter_google_thankjs = function ( $tag, $handle ) {
			if ( 'google_thankjs' !== $handle ) {
				return $tag;
			}

			return $this->add_snippet_comments( $tag );
		};

		add_filter( 'script_loader_tag', $filter_google_thankjs, 10, 2 );

		if ( $is_singular_button_post_type_entity ) {
			wp_enqueue_script( 'google_thankjs' );
		}
	}

	/**
	 * Updates the content of the post.
	 *
	 * @since n.e.x.t
	 *
	 * @param string $content Content of the post.
	 * @return string Content of the post.
	 */
	protected function update_the_content( $content ) {
		if ( ! $this->is_singular_button_post_type_entity() || substr( $this->button_placement, 0, 7 ) !== 'static_' ) { // strlen( 'static_' ) is 7.
			return $content;
		}

		$button_placeholder = '<div counter-button style="height: 34px; visibility: hidden; box-sizing: content-box; padding: 12px 0; display: inline-block; overflow: hidden;"></div><button twg-button style="height: 42px; visibility: hidden; margin: 12px 0;"></button>';
		$button_placeholder = $this->add_snippet_comments( $button_placeholder );

		if ( in_array( $this->button_placement, array( 'static_auto', 'static_below-content' ), true ) ) {
			$content = $content . $button_placeholder;
		} elseif ( 'static_above-content' === $this->button_placement ) {
			$content = $button_placeholder . $content;
		} elseif ( 'static_below-first-paragraph' === $this->button_placement ) {
			$content = substr_replace( $content, $button_placeholder, strpos( $content, '</p>' ) + 4, 0 ); // strlen( '</p>' ) is 4.
		}

		return $content;
	}

	/**
	 * Determine if the current page is a singular button post type entry.
	 *
	 * @since n.e.x.t
	 *
	 * @return bool True if the current page is a singular button post type entry. False otherwise.
	 */
	private function is_singular_button_post_type_entity() {
		return is_singular( $this->button_post_types );
	}

	/**
	 * Add snippet comments around the tag.
	 *
	 * @since n.e.x.t
	 *
	 * @param string $code The tag code.
	 *
	 * @return string The tag code with snippet comments.
	 */
	private function add_snippet_comments( $code ) {
		$before = sprintf( "\n<!-- %s -->\n", esc_html__( 'Thank with Google snippet added by Site Kit', 'google-site-kit' ) );
		$after  = sprintf( "\n<!-- %s -->\n", esc_html__( 'End Thank with Google snippet added by Site Kit', 'google-site-kit' ) );
		return $before . $code . $after;
	}
}
