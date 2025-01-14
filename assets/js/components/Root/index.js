/**
 * Root component.
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
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { StrictMode, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import ErrorHandler from '../ErrorHandler';
import FeaturesProvider from '../FeaturesProvider';
import { enabledFeatures } from '../../features';
import PermissionsModal from '../PermissionsModal';
import RestoreSnapshots from '../RestoreSnapshots';
import { FeatureToursDesktop } from '../FeatureToursDesktop';
import CurrentSurveyPortal from '../surveys/CurrentSurveyPortal';
import { Provider as ViewContextProvider } from './ViewContextContext';
import InViewProvider from '../InViewProvider';
import { isSiteKitScreen } from '../../util/is-site-kit-screen';

export default function Root( { children, registry, viewContext = null } ) {
	const [ inViewState ] = useState( {
		key: 'Root',
		value: true,
	} );

	return (
		<StrictMode>
			<InViewProvider value={ inViewState }>
				<Data.RegistryProvider value={ registry }>
					<FeaturesProvider value={ enabledFeatures }>
						<ViewContextProvider value={ viewContext }>
							<ErrorHandler>
								<RestoreSnapshots>
									{ children }
									{ /*
									TODO: Replace `FeatureToursDesktop` with `FeatureTours`
									once tour conflicts in smaller viewports are resolved.
									@see https://github.com/google/site-kit-wp/issues/3003
								*/ }
									{ viewContext && <FeatureToursDesktop /> }
									<CurrentSurveyPortal />
								</RestoreSnapshots>
								{ isSiteKitScreen( viewContext ) && (
									<PermissionsModal />
								) }
							</ErrorHandler>
						</ViewContextProvider>
					</FeaturesProvider>
				</Data.RegistryProvider>
			</InViewProvider>
		</StrictMode>
	);
}

Root.propTypes = {
	children: PropTypes.node,
	registry: PropTypes.object,
	viewContext: PropTypes.string.isRequired,
};

Root.defaultProps = {
	registry: Data,
};
