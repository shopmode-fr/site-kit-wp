/**
 * ActivationBanner component.
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
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ReminderBanner from './ReminderBanner';
import SetupBanner from './SetupBanner';
import SuccessBanner from './SuccessBanner';
import {
	ACTIVATION_STEP_REMINDER,
	ACTIVATION_STEP_SETUP,
	ACTIVATION_STEP_SUCCESS,
} from '../../../constants';

export default function ActivationBanner() {
	const [ step, setStep ] = useState( ACTIVATION_STEP_REMINDER );

	const handleCTAClick = () => {
		if ( step === ACTIVATION_STEP_REMINDER ) {
			setStep( ACTIVATION_STEP_SETUP );
		}

		if ( step === ACTIVATION_STEP_SETUP ) {
			setStep( ACTIVATION_STEP_SUCCESS );
		}

		return { dismissOnCTAClick: false };
	};

	switch ( step ) {
		case ACTIVATION_STEP_REMINDER:
			return <ReminderBanner onCTAClick={ handleCTAClick } />;
		case ACTIVATION_STEP_SETUP:
			return <SetupBanner onCTAClick={ handleCTAClick } />;
		case ACTIVATION_STEP_SUCCESS:
			return <SuccessBanner />;
		default:
			return null;
	}
}
