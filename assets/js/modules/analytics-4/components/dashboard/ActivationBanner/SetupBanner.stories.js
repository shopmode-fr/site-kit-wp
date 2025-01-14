/**
 * SetupBanner Component Stories.
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
 * Internal dependencies
 */
import SetupBanner from './SetupBanner';
import {
	provideModuleRegistrations,
	provideModules,
	provideSiteInfo,
} from '../../../../../../../tests/js/utils';
import WithRegistrySetup from '../../../../../../../tests/js/WithRegistrySetup';
import { MODULES_ANALYTICS_4 } from '../../../datastore/constants';
import * as ga4Fixtures from '../../../../analytics-4/datastore/__fixtures__';

const Template = () => <SetupBanner />;

export const NoPropertyNoTag = Template.bind( {} );
NoPropertyNoTag.storyName = 'No GA4 Property - No Existing Tag';

export const WithPropertyNoTag = Template.bind( {} );
WithPropertyNoTag.storyName = 'Existing GA4 Property - No Existing Tag';
WithPropertyNoTag.decorators = [
	( Story ) => {
		const setupRegistry = ( registry ) => {
			registry.dispatch( MODULES_ANALYTICS_4 ).setMeasurementID(
				// eslint-disable-next-line sitekit/acronym-case
				ga4Fixtures.webDataStreams[ 0 ].webStreamData.measurementId
			);
		};

		return (
			<WithRegistrySetup func={ setupRegistry }>
				<Story />
			</WithRegistrySetup>
		);
	},
];

export const WithPropertyAndTag = Template.bind( {} );
WithPropertyAndTag.storyName = 'Existing GA4 Property - Existing Tag';
WithPropertyAndTag.decorators = [
	( Story ) => {
		const setupRegistry = ( registry ) => {
			registry.dispatch( MODULES_ANALYTICS_4 ).setMeasurementID(
				// eslint-disable-next-line sitekit/acronym-case
				ga4Fixtures.webDataStreams[ 0 ].webStreamData.measurementId
			);
			registry.dispatch( MODULES_ANALYTICS_4 ).receiveGetExistingTag(
				// eslint-disable-next-line sitekit/acronym-case
				ga4Fixtures.webDataStreams[ 0 ].webStreamData.measurementId
			);
		};

		return (
			<WithRegistrySetup func={ setupRegistry }>
				<Story />
			</WithRegistrySetup>
		);
	},
];

export const NoPropertyWithTag = Template.bind( {} );
NoPropertyWithTag.storyName = 'No GA4 Property - Existing Tag';
NoPropertyWithTag.decorators = [
	( Story ) => {
		const setupRegistry = ( registry ) => {
			registry.dispatch( MODULES_ANALYTICS_4 ).receiveGetExistingTag(
				// eslint-disable-next-line sitekit/acronym-case
				ga4Fixtures.webDataStreams[ 0 ].webStreamData.measurementId
			);
		};

		return (
			<WithRegistrySetup func={ setupRegistry }>
				<Story />
			</WithRegistrySetup>
		);
	},
];

export default {
	title: 'Modules/Analytics4/SetupBanner',
	decorators: [
		( Story ) => {
			const setupRegistry = ( registry ) => {
				provideModules( registry, [
					{
						slug: 'analytics-4',
						active: true,
						connected: true,
					},
				] );

				provideSiteInfo( registry );
				provideModuleRegistrations( registry );

				registry
					.dispatch( MODULES_ANALYTICS_4 )
					.receiveGetExistingTag( null );
			};

			return (
				<WithRegistrySetup func={ setupRegistry }>
					<Story />
				</WithRegistrySetup>
			);
		},
	],
};
