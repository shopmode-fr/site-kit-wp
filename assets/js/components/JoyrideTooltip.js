/**
 * JoyRideTooltip component.
 *
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
 * External dependencies
 */
import { PropTypes } from 'prop-types';
import Joyride, { EVENTS } from 'react-joyride';

/**
 * Internal dependencies
 */
import TourTooltip from './TourTooltip';
import { joyrideStyles, floaterProps } from './TourTooltips';

export default function JoyrideTooltip( {
	title,
	content,
	dismissLabel,
	target,
	onDismiss = () => {},
} ) {
	const steps = [
		{
			title,
			target,
			content,
			disableBeacon: true,
			isFixed: true,
			placement: 'auto',
		},
	];

	// Provides button content as well as aria-label & title attribute values.
	const joyrideLocale = {
		last: dismissLabel,
	};

	return (
		<Joyride
			callback={ ( { type } ) => {
				if ( type === EVENTS.STEP_AFTER ) {
					// This is not strictly necessary as the tooltip will hide without it, but this allows the consumer of the component to clean up post-dismiss.
					onDismiss();
				}
			} }
			disableOverlay
			disableScrolling
			spotlightPadding={ 0 }
			floaterProps={ floaterProps }
			locale={ joyrideLocale }
			run
			steps={ steps }
			styles={ joyrideStyles }
			tooltipComponent={ TourTooltip }
		/>
	);
}

JoyrideTooltip.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	dismissLabel: PropTypes.string.isRequired,
	target: PropTypes.string.isRequired,
	onDismiss: PropTypes.func,
};
