/**
 * `modules/thank-with-google` data store: selectors test.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
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
 * Internal dependencies
 */
import { MODULES_THANK_WITH_GOOGLE } from './constants';
import {
	createTestRegistry,
	unsubscribeFromAll,
} from '../../../../../tests/js/utils';

describe( 'modules/thank-with-google properties', () => {
	let registry;

	beforeEach( () => {
		registry = createTestRegistry();
	} );

	afterEach( () => {
		unsubscribeFromAll( registry );
	} );

	describe( 'store', () => {
		it( 'is registered correctly', () => {
			const selectors = registry.select( MODULES_THANK_WITH_GOOGLE );

			expect( selectors.getPublicationID ).toBeInstanceOf( Function );
		} );
	} );
} );
