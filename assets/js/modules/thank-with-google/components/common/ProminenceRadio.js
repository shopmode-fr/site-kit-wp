/**
 * Site Kit by Google, Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import {
	MODULES_THANK_WITH_GOOGLE,
	BUTTON_PLACEMENT_DYNAMIC_HIGH,
	BUTTON_PLACEMENT_DYNAMIC_LOW,
} from '../../datastore/constants';
import ImageRadio from '../../../../components/ImageRadio';
import ProgressBar from '../../../../components/ProgressBar';
const { useSelect, useDispatch } = Data;

const DynamicLowSVG = lazy( () =>
	import( '../../../../../svg/graphics/twg-dynamic-low.svg' )
);
const DynamicHighSVG = lazy( () =>
	import( '../../../../../svg/graphics/twg-dynamic-high.svg' )
);

export default function ProminenceRadio() {
	const { setButtonPlacement } = useDispatch( MODULES_THANK_WITH_GOOGLE );

	const buttonPlacement = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getButtonPlacement()
	);

	const onChange = useCallback(
		( { target } = {} ) => {
			const { value: placement } = target || {};
			setButtonPlacement( placement );
		},
		[ setButtonPlacement ]
	);

	return (
		<div className="googlesitekit-twg-setting-field googlesitekit-twg-prominence-radio">
			<h4>{ __( 'Prominence', 'google-site-kit' ) }</h4>
			<div className="googlesitekit-twg-prominence-radio__options">
				<Suspense fallback={ <ProgressBar small /> }>
					<ImageRadio
						id={ `button-placement-${ BUTTON_PLACEMENT_DYNAMIC_LOW }` }
						name="button-placement"
						value={ BUTTON_PLACEMENT_DYNAMIC_LOW }
						label={ __( 'Low', 'google-site-kit' ) }
						description={ __(
							'Floats at the bottom of the page',
							'google-site-kit'
						) }
						image={ <DynamicLowSVG /> }
						onChange={ onChange }
						checked={
							buttonPlacement === BUTTON_PLACEMENT_DYNAMIC_LOW
						}
					/>
					<ImageRadio
						id={ `button-placement-${ BUTTON_PLACEMENT_DYNAMIC_HIGH }` }
						name="button-placement"
						value={ BUTTON_PLACEMENT_DYNAMIC_HIGH }
						label={ __( 'High', 'google-site-kit' ) }
						description={ __(
							'Can be temporary dismissed',
							'google-site-kit'
						) }
						image={ <DynamicHighSVG /> }
						onChange={ onChange }
						checked={
							buttonPlacement === BUTTON_PLACEMENT_DYNAMIC_HIGH
						}
					/>
				</Suspense>
			</div>
		</div>
	);
}